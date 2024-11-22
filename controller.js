const User = require('./model')

// create 
const createUser = async (req, res) => {
    try {
        const { email, mobile } = req.body

        // validate the email and mobile already exists or not 
        let exEmail = await User.findOne({ email })
        let exMobile = await User.findOne({ mobile })

        if (exEmail) {
            return res.status(400).json({ status: false, msg: `${email} already exists` })
        } else if (exMobile) {
            return res.status(400).json({ status: false, msg: `${mobile} already exists` })
        } else {
            // store the data
            let newUser = await User.create(req.body)
            return res.status(201).json({ status: true, msg: "new user created", user: newUser })
        }

    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

// read all
const readAllUser = async (req, res) => {
    try {
        let users = await User.find({})

        return res.status(200).json({ length: users.length, users })
    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

// read single
const readSingleUser = async (req, res) => {
    try {
        let id = req.params.id
        let user = await User.findById(id)

        if (!user)
            return res.status(404).json({ status: false, msg: `Requested user not found` })

        res.status(200).json({ user })
    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

// update
const updateUser = async (req, res) => {
    try {
        let id = req.params.id

        let exUser = await User.findById(id)
        if (!exUser)
            return res.status(404).json({ status: false, msg: `Requested user not found` })

        await User.findByIdAndUpdate({ _id: id }, req.body)

        res.status(200).json({ status: true, msg: "User data updated successfully" })

    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

// delete
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id

        let exUser = await User.findById(id)
        if (!exUser)
            return res.status(404).json({ status: false, msg: `Requested user not found` })

        await User.findByIdAndDelete(id)

        res.status(200).json({ msg: "user deleted successfully" })
    } catch (err) {
        return res.status(500).json({ status: false, msg: err.message })
    }
}

module.exports = { createUser, readAllUser, readSingleUser, updateUser, deleteUser }