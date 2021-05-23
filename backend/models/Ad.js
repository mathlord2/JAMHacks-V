const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    title: String,
    price: Number,
    city: String,
    date: Date,
    description: String,
    type: String,
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    image: {file: {data:Buffer,contentType:String}},
    users: [{
        name: String,
        amount: Number,
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

const Ad = mongoose.model('Ad',adSchema)