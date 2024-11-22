const mongoose = require('mongoose')

const connectDB = async () => {
    return await mongoose.connect(process.env.MONGO_URL).then(res => {
        console.log(`mongodb connected`)
    }).catch(err => {
        console.log(err.message)
    })
}

module.exports = connectDB