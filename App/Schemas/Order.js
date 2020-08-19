const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const order = mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    orderedFoods: [{
        food_id: {
            type: ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        serves: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0,
        },

    }],
    totalPrice: {
        type: Number,
        required: true
    },
    NofPersons: {
        type: Number,
        required: true
    },
    deliveryTime: {
        type: Date,
        required: true
    },
    total_gst: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    delivery: {
        deliveryAddress: {
            type: String,

        },
        deliveryCharges: {
            type: Number,
            default: 0,
        },
    },
    amountPayed: {
        amount: {
            type: Number,
            default: 0,
        },
        paid: {
            type: Boolean,
            default: false
        }
    },
    delivered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', order);
