const express = require('express')
const productController = require('../controllers/product.controller')
const userController = require('../controllers/user.controller')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Connected to database successfully')
})

//Products API
router.get('/products',productController.getAllProducts)
router.get('/products/:id',productController.getProductById)
router.post('/add-product',productController.addProduct)
router.delete('/products',productController.deleteProductById)
router.patch('/products',productController.updateProductById)

//Users API
router.get('/users',userController.getAllUsers)

module.exports = router