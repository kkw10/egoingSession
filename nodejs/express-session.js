const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')
 
const app = express()
 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
 
app.get('/', function (req, res, next) {
  res.send('Hello session')
})

app.listen(3000, () => {
    console.log('Server is running...')
})