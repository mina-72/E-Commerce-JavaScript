const express = require('express')
const categoryController = require('../controllers/categoryController')

//routers
const router = express.Router()

router
    .route('/')
    .get(categoryController.getAllCategory)
    .post(categoryController.createCategory)

router
    .route('/:id')
    .get(categoryController.getCategory)
    .delete(categoryController.deleteCategory)
    .patch(categoryController.updateCategory)
module.exports = router
