const app = require('./app')
const mongoose = require('mongoose')

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
