const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleWare/errorMiddleWare')
const port = process.env.PORT || 5000


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, ()=>console.log(`running on port ${port}`))