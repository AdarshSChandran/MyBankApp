// 1. server mongodb integration

// import
const mongoose = require('mongoose')

// state connection string using mongoose
mongoose.connect('mongodb://localhost:27017/BankServer',{useNewUrlParser:true}) 

// 2. define db(bankserver) model(collection)
//  collection name - users =  User  (always use sinmgular of collection name in database and first letter is capital)
const User = mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
}) 

// export model to use in server
module.exports={
    User
}