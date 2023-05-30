const mongoose = require("mongoose")

const connectdb = async(url)=>{
    await mongoose.connect(url)
}

module.exports = connectdb