const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    title: String,
    price: Number,
    city: String,
    date: Date,
    description: String,
    type: String,
    hidden:{
         type: Boolean,
         default: false
    },
    owner: {
        id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name: String},
    image: {file: {data:Buffer,contentType:String}},
    users: [{
        name: String,
        message: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    finalBuyer: {
        name: String,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
})

module.exports = mongoose.model('Ad', adSchema)