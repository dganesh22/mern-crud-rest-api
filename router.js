const appRoute = require('express').Router()
const { createUser, readAllUser, readSingleUser, updateUser, deleteUser } = require('./controller')


// http://localhost:4000/api/user/add  
appRoute.post(`/add`, createUser)

// http://localhost:4000/api/user/all
appRoute.get(`/all`, readAllUser)

// http://localhost:4000/api/user/single/123
appRoute.get(`/single/:id`, readSingleUser)

// http://localhost:4000/api/user/update/123
appRoute.patch(`/update/:id`, updateUser)

// http://localhost:4000/api/user/delete/123
appRoute.delete(`/delete/:id`, deleteUser)

module.exports = appRoute