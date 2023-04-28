const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookieParser());
app.use(session({
  secret: 'mysecret', // set a secret to sign the session ID cookie
  resave: false, // don't save the session if it hasn't been modified
  saveUninitialized: false, // don't create a session until something is stored
}));

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/app', require('./routes/appRoutes'))

app.listen(port, ()=>console.log(`running on port ${port}`))