require('dotenv').config()
const express = require("express")
const app = express()
const {router} = require("./backend/routes")
const connectdb = require("./backend/connectdb")
const path = require("path")

const port = 4000
app.use(express.json())
app.use(express.static(path.join(__dirname, "./frontend/build")))
app.use("/", router)
const start = async()=>{
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(port, 
            console.log(`Listening at the port ${port}...`)
        )
    } catch (error) {
        console.log(error)
    }
}

start()