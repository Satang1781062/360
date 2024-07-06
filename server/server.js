const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const dotenv = require('dotenv') 

require('dotenv').config();
const { readdirSync } = require('fs')
const connectDB = require('./config/db')


const {swaggerUi, swaggerSpec} =require('./config/swaggerConfig')






const app = express()


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//ConnectDB
connectDB()

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

// Route
// #1
// app.use('/api', require('./routes/api'))


readdirSync('./routes')
.map((r)=> app.use('/api', require('./routes/'+r)))

const port = process.env.PORT
app.listen(port,()=>{
    console.log('Server is running on port' +port)
})