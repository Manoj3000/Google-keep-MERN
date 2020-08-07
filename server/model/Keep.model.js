const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keepSchema = new Schema({
    id: {
        type: String,
        require
    },
    title: {
        type: String,
        require
    },
    task: {
        type: String,
        require
    }

})

module.exports = mongoose.model('keep', keepSchema)