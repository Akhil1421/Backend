require("dotenv").config()
const express = require("express")
const {router} = require("./routes")
const app = express()
const connectdb = require("./connectdb")
const path = require("path")

const port = 4000
app.use(express.json())
app.use(express.static(path.join(__dirname, "./frontend/build")))
app.use(router)
app.get("*", (req,res)=>{
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        (err)=>{
            res.status(500).send(err)
        }
    )
})
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