const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task : {
        type : String
    },
    completed : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : String,
    },
    updatedAt : {
        type : String,
    }
})

const notes = new mongoose.Schema({
    title : {
        type : String,
        default : ""
    },
    note : {
        type : String ,
        required : true
    }  
})

const User = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 2
    },email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        unique: true
    },
    memories : [taskSchema],
    notes : [notes]
},  {timestamps : true}
)
let user = mongoose.model('user', User)
module.exports = {user}