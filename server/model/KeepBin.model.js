const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keepBinSchema = new Schema({
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

module.exports = mongoose.model('keepBin', keepBinSchema)