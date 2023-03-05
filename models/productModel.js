const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    richDescription: {
        type: 'string',
        default: '',
    },
    images: {
        type: 'string',
    },

    brand: {
        type: 'string',
        default: '',
    },
    price: {
        type: 'number',
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countInSock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

productSchema.set('toJSON', {
    virtuals: true,
})

const Product = mongoose.model('Product', productSchema)
module.exports = { Product }
