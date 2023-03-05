const { Category } = require('../models/categoryModel')

exports.getAllCategory = async (req, res) => {
    const allcats = await Category.find()
    return res.status(200).json({
        results: allcats.length,
        data: allcats,
    })
}

exports.createCategory = async (req, res) => {
    const category = new Category({ ...req.body })
    const newcategory = await category.save()
    if (!newcategory) {
        res.status(500).json({ message: `can not create category` })
    } else {
        return res.status(201).json(newcategory)
    }
}

exports.getCategory = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const category = await Category.findById(id)
    if (!category) {
        res.status(500).json({ message: `can not find category by id:  ${id}` })
        // return `can not find category ${id}`, 500
    } else {
        return res.status(200).json(category)
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findByIdAndRemove(id)
    if (!category) {
        res.status(500).json({
            message: `can not delete category by id: ${id}`,
        })
    } else {
        res.status(200).json(category)
    }
}

exports.updateCategory = async (req, res) => {
    const { id } = req.params
    await Category.updateOne({ id }, req.body)
    const updatedCategory = await Category.findById(id)

    if (!updatedCategory) {
        res.status(500).json({
            message: `can not update category by id: ${req.params.id}`,
        })
    } else {
        res.status(200).json(updatedCategory)
    }
}
