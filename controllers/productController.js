const { Product } = require('../models/productModel')
const { Category } = require('../models/categoryModel')

exports.createProduct = async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res.status(500).send('invalid category id')
    }
    const product = await Product.create({ ...req.body })
    const newProduct = await product.save()

    if (!newProduct) {
        res.status(500).json({ message: 'can not create new product' })
    } else {
        res.status(200).json(newProduct)
    }
}

exports.getAllProduct = async (req, res) => {
    const productList = await Product.find()
    if (!productList) {
        res.status(404).json({ message: 'can not find products' })
    } else {
        res.status(200).json({
            results: productList.length,
            data: productList,
        })
    }
}

exports.getProductCategory = async (req, res) => {
    const filter = {}
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    const productList = await Product.find()
    if (!productList) {
        res.status(404).json({ message: 'can not find products' })
    } else {
        res.status(200).json({
            results: productList.length,
            data: productList,
        })
    }
}

exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category')

    if (!product) {
        req.status(404).json({
            message: `can not find product by id: ${req.params.id}`,
        })
    } else {
        res.status(200).json(product)
    }
}

exports.updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        ...req.body,
    })
    if (!product) {
        res.status(404).json({
            message: `can not update product by id: ${req.Category.id}`,
        })
    } else {
        res.status(200).json(product)
    }
}

exports.deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id)
    if (!product) {
        res.status(404).json({
            message: `can not delete product by id: ${req.params.id}`,
        })
    } else {
        res.status(200).json({
            message: `delete product by id: ${req.params.id}`,
            data: product,
        })
    }
}

// exports.getCountProduct = async (req, res) => {
//     const productCount = await Product.countDocuments((count) => count)
//     if (!productCount) {
//         res.status(500).json({ success: false })
//     }
//     res.json({
//         productCount: productCount,
//     })
// }

exports.getFeatured = async (req, res) => {
    const products = await Product.find({ isFeatured: false })
    if (!products) {
        res.status(500).json({
            // success: false,
            message: 'can not find product with isFatured: true',
        })
    } else {
        res.send(products)
    }
}
