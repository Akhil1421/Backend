require("dotenv").config()
const express = require("express")
const {router} = require("./backend/routes")
const app = express()
const connectdb = require("./backend/connectdb")
const path = require("path")

const port = 4000
app.use(express.json())
// app.use(express.static(path.join(__dirname, "../frontend/build")))
app.use("/", router)
const start  = ()=>{
    app.listen(port,async()=>{        
        try {
            connectdb(process.env.MONGO_URI)
            console.log(`Server started  at port ${port}`)
        } catch (error) {
            console.log(error.message)
        }
    })
}

start() 