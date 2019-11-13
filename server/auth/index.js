const router = require('express').Router()
const {User, Product, Cart, Order, Review} = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    console.log('in login')
    const user = await User.findOne({
      where: {email: req.body.email},
      include: [{model: Review}, {model: Order}]
      // include: [Product]
    })
    if (user) {
      const [newCart] = await Cart.findOrCreate({
        where: {sid: req.sessionID},
        include: [Product]
      })
      const oldCart = await user.getCart()
      await oldCart.addProducts(newCart.products)

      if (!user) {
        console.log('No such user found:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else if (!user.correctPassword(req.body.password)) {
        console.log('Incorrect password for user:', req.body.email)
        res.status(401).send('Wrong username and/or password')
      } else {
        await user.update({sessionId: req.sessionID})
        req.login(user, err => {
          err ? next(err) : res.json(user)
        })
      }
    } else {
      res.status(401).send('Wrong username and/or password')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    await user.update({sessionId: req.sessionID})
    const [cart] = await Cart.findOrCreate({where: {sid: req.sessionID}})

    await user.setCart(cart)

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  console.log('is this getting called')
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
