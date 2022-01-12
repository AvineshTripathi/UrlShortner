const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')

require('dotenv').config()

if(mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})){
    console.log('db connected')
    console.log(process.env.URI)
}

const app = express()
app.use(express.json())
app.use(routes)
app.use(cors())

app.listen(8000, () => {
    console.log(`server running on port ${8000}`)
})                                                                                                                                                                                                                                                                                                                                                                                                               