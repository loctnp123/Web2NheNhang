const express = require('express')
const orderController = require('../controllers/order.controller')
const productController = require('../controllers/product.controller')
const userController = require('../controllers/user.controller')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Connected to database successfully')
})

//Products API
router.get('/products',productController.getAllProducts)
router.post('/productsFromCart',productController.getProducts)
router.get('/products/:id',productController.getProductById)
router.post('/add-product',productController.addProduct)
router.delete('/products/:id',productController.deleteProductById)
router.patch('/products/:id',productController.updateProductById)

router.get('/categories',productController.getCategoryCount)
//Users API
router.get('/users',userController.getAllUsers)
router.get('/users/:id',userController.getUserById)
router.post('/register',userController.register)
router.delete('/users/:id',userController.deleteUserById)
router.patch('/users/:id',userController.updateUserById)

router.get('/users/:id/cart',userController.getCartByUserId)

router.post('/users/authenticate',userController.authenticate)
router.post('/users/:id/ban',userController.ban)
router.post('/users/:id/unban',userController.unban)
router.post('/users/:id/addToCart',userController.addCartItem)
router.post('/users/:id/removeCartItem',userController.removeCartItem)
router.post('/users/:id/removeCartItems',userController.removeCartItems)
router.post('/users/:id/addDelInfo',userController.addDelInfo)
router.delete('/users/:id/deleteDelInfo',userController.deleteDelInfo)

//Orders API
router.get('/orders',orderController.getAllOrders)
router.get('/orders/:id',orderController.getOrderById)
router.get('/users/:id/orders',orderController.getOrdersByUserId)

router.delete('/orders',orderController.deleteAll)

router.post('/users/:id/createOrder',orderController.createOrder)

module.exports = router