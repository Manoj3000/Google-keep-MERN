const mongoose = require('mongoose')
const dbConfig = require('./db.config')

mongoose.connect(dbConfig.url , {useNewUrlParser : true , useUnifiedTopology : true} )
.then(()=>{
    console.log("DataBase connect successfully.");
})
.catch(err =>{
    console.log('Error while database connection.'+ err);
    process.exit()
})