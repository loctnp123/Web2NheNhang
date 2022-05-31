const mongoose = require('mongoose')

require('dotenv/config')

async function connect(){
    await mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
        .then(
            console.log('Connected to database')
        )
        .catch(err=>console.log('Failed to connect to database. Error:'+err.message))
}
module.exports = {connect}

