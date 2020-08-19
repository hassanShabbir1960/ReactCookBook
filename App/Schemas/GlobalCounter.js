const mongoose = require('mongoose');
const count = mongoose.Schema({
    count: {
        type: Number,
        min: 1
    },
    active:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Count', count);
