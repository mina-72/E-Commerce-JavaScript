const express = require('express')
const app = express()
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
app.use(express.json())

app.use('/categories', categoryRouter)

app.get('/categories/:id', categoryRouter)

app.use('/products', productRouter)

module.exports = app
