const router = require('express').Router()
const {Product, Review} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      order: [['id', 'ASC']]
    })
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(+req.params.id, {
      include: [{model: Review}]
    })
    if (!product) {
      res.status(401).send('product not found')
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  console.log('TCL: req.body.category', req.body.category)
  try {
    if (!req.user || !req.user.isAdmin) {
      res.send('User is not an admin').end()
      return null
    }

    const product = await Product.findByPk(+req.params.id)
    if (!product) {
      res.status(401).send('product not found')
    }
    console.log('TCL: product in db', product.category)
    // const updated = await product.update(req.body)
    const updated = await product.update({
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      availability: req.body.availability,
      quantity: req.body.quantity,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    })
    res.send(updated)
  } catch (error) {
    next(error)
  }
})

router.put('/')

router.get('/search/:term', async (req, res, next) => {
  try {
    // console.log('req.params.term', req.params.term)
    const searchProducts = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${req.params.term}%`
        }
      }
    })

    res.send(searchProducts)
  } catch (err) {
    next(err)
  }
})
