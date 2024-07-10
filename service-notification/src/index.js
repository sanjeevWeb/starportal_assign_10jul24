require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notificationRoute = require('./routes/notification.route.js')
const connectDB = require('./database/index.js')

const app = express()

// required middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//connecting db
connectDB(process.env.MONGODB_URI)

//route middlewares
app.use('/api', notificationRoute)

app.listen(4002, () => {
    console.log('running on port 4002');
})