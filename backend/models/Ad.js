const mongoose = require("mongoose");
//ad stuff
const adSchema = new mongoose.Schema({
    name: String,
    price: Number,
    location: String,
    date: Date,
    description: String,
    category: String,
    hidden:{
         type: Boolean,
         default: false
    },
    owner: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    image: {
        file: {
            data: Buffer,
            contentType: String
        }
    },
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

const Ad = mongoose.model('Ad', adSchema)
