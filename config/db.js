
const mongoose = require('mongoose')
const colors = require('colors')

//function mongose connections
 const connectDB = async ()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected TO Database ${mongoose.connection.host}`.bgCyan)

    }catch(error){
        console.log('DB error', error);
    }
   
}

module.exports = connectDB;
