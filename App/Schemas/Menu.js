const mongoose = require('mongoose');
const menu = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    serves: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    rating: {
        stars: {
            type: Number,
            default: 0
        },
        people: {
            type: Number,
            default: 0
        }
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menu);
