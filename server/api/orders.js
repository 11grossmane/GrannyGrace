const router = require('express').Router()
const {Product, Cart, User, Order} = require('../db/models')

router.get('/users', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id
      },
      include: [{model: Product}]
    })
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    let cart
    let user
    console.log('TCL: req.user', req.user)
    if (req.user) {
      cart = await Cart.findOne({
        where: {userId: req.user.id}
      })
      user = await cart.getUser()
    } else {
      cart = await Cart.findOne({
        where: {
          sid: req.sessionID
        }
      })
    }

    const products = await cart.getProducts()
    const order = await Order.create({
      price: req.body.total,
      lockedProducts: products
    })
    let updated
    if (!req.user) {
      updated = await order.update({email: req.body.email})
    } else {
      await order.setUser(user)
      await order.update({email: req.user.email})
      updated = await Order.findByPk(order.id, {include: [User]})
    }

    console.log('lockedproducts', order.lockedProducts)
    res.json(updated)
  } catch (error) {
    next(error)
  }
})

module.exports = router
