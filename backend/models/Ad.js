const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    title: String,
    price: Number,
    city: String,
    date: Date,
    description: String,
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    image: {file: {data:Buffer,contentType:String}}
})

const Ad = mongoose.model('Ad',adSchema)