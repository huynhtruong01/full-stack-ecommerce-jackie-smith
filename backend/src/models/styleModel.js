const mongoose = require('mongoose')

const styleModel = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
        },
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
})

const Style = mongoose.model('Style', styleModel)

module.exports = Style
