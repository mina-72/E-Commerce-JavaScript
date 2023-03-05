const express = require('express')
const app = express()
const categoryRouter = require('./routes/categoryRoute')
const productRouter = require('./routes/productRoute')
const userRouter = require('./routes/userRoute')
app.use(express.json())

app.use('/categories', categoryRouter)

app.get('/categories/:id', categoryRouter)

app.use('/products', productRouter)

app.use('/users', userRouter)
app.get('/users/:id', userRouter)

module.exports = app
