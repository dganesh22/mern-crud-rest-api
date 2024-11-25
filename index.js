const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config')

const PORT = process.env.PORT

const app = express()

// middleware settings
// body parser middleware -> x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// body parser -> json format
app.use(express.json())

// cors middleware -> cross origin resource sharing 
const corsOpts = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
}
app.use(cors(corsOpts))

// index controller 
app.get(`/`, async (req, res) => {
    try {
        res.status(200).json({ status: true, msg: "Welcome to NODE API" })
    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
})

// connect router
app.use(`/api/user`, require('./router'))


// default controller 
app.all(`*`, async (req, res) => {
    try {
        res.status(404).json({ status: true, msg: "Requested path not found" })
    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
})


// server listen
app.listen(PORT, () => {
    connectDB()
    console.log(`server is connected @ http://localhost:${PORT}`)
})