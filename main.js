const express = require('express')
const mongoose = require('mongoose')
const { Category } = require('./models/categoryModel')
const app = express()

app.use(express.json())

app.get('/categories', async (req, res) => {
    const allcats = await Category.find()
    return res.status(200).json(allcats)
})

app.post('/categories', async (req, res) => {
    const newcat = new Category({ ...req.body })
    const insertedCat = await newcat.save()
    return res.status(201).json(insertedCat)
})

const start = async () => {
    try {
        await mongoose.connect('mongodb://192.168.20.1:27017/sale')
        app.listen(3000, () => console.log('Server started on port 3000'))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

start()
