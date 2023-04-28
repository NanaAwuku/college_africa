const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookieParser());
app.use(session({
  secret: 'mysecret', 
  resave: false, 
  saveUninitialized: false, 
}));

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/app', require('./routes/appRoutes'))

app.listen(port, ()=>console.log(`running on port ${port}`))