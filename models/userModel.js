const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
    },
    passwordHash: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'string',
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: 'string',
        default: '',
    },
    apartement: {
        type: 'string',
        default: '',
    },
    zip: {
        type: 'string',
        default: '',
    },
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true,
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
