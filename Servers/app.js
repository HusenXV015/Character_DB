require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const router = require(`./routes/router`)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.use('/', router);

module.exports = app