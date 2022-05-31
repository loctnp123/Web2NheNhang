const express = require('express')
const app = express()
const morgan = require('morgan')
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./src/routes/router')
const db = require('./src/config/database.config')

db.connect()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',router)

app.listen(port,()=>{
    console.log(`App is being listened at http://localhost:${port}/`)
})

