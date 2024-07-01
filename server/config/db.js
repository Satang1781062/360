const mongoose = require('mongoose')

const connectDB = async() =>{
    mongoose.connect(process.env.DATABASE,{
        // useNewUrlParser:true,
        // useUnifiedTopology:false 
     }).then(()=>console.log("เชื่อมต่อเรียบร้อย"))
     .catch((err)=>console.log(err))
}

module.exports = connectDB;