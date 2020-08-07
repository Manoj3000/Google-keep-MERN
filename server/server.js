const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 4000 

require('./db/db.connection')

const route = require('./router/Keep.route')
const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(bodyParser.json())

app.use(route)

app.listen(PORT , ()=>{
    console.log('server is running on ' + PORT);
})