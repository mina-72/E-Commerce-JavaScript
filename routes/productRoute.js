const express = require('express')
const productController = require('../controllers/productController')
const router = express.Router()

router
    .route('/')
    .post(productController.createProduct)
    .get(productController.getAllProduct)
    .get(productController.getProductCategory)

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

// router.route('/get/count').get(productController.getCountProduct)
router.route('/get/featured').get(productController.getFeatured)

module.exports = router
