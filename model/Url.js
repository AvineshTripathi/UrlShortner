const mongoose = require('mongoose')

const Url = mongoose.Schema({
    alias: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Url',Url)