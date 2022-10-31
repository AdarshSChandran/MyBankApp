// here importing library for generating token
const jwt = require('jsonwebtoken')

// import model
const db = require('./db')

userDetails = {
    1000: { acno: 1000, username: 'zoro', password: 123, balance: 300000,transaction:[]},
    1001: { acno: 1001, username: 'sanji', password: 123, balance: 200000,transaction:[]},
    1002: { acno: 1002, username: 'shanks', password: 123, balance: 500000,transaction:[] },
    1003: { acno: 1003, username: 'luffy', password: 123, balance: 1000000,transaction:[] },
  };


const register = (acno,username,password)=>{

  return db.User.findOne({acno}).then(user=>{
    if(user){
      return {
        statusCode:401,
        status:false,
        message:'user already exist'
      }
    }
    else{
      // insert data into db
      const newuser= new db.User({acno,username,password,balance:0,transaction:[]})
      // to store object in collection
      newuser.save()
      return {
        statusCode:200,
        status:true,
        message:'registration success'
      }
    }
 
  })

}

  

const login=(acnum,psw)=>{
  return db.User.findOne({acno:acnum,password:psw}).then(user=>{
    if(user){

      currentUser=user.username;
      currentAcno=acnum;
      const token = jwt.sign({currentAcno:acnum},'secretkey123')
                                                // give a string without space above

      return {
        statusCode:200,
        status:true,
        message:'login success',
        currentUser,
        currentAcno,
        token
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'incorrect account number or password'
      }
    }
  })
}


const deposit= (acnum,pswrd,amnt) => {

  let amount=parseInt(amnt);  /*parseInt is used to convert string to integer*/
  return db.User.findOne({acno:acnum,password:pswrd}).then(user=>{
    if(user){
    user.balance+=amount;
    user.transaction.push({type:'CREDIT',amount})
    user.save(); //to save the updation in db
    return {
      statusCode:200,
      status:true,
      message:`${amount} credited and new balance is ${user.balance}`
    }    
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'incorrect acnumber password'
      }
    }
  })
}
  


const withdraw = (acnum1,pswrd1,amnt1)=>{  // here in argument we dont need to necessarily give the same name like acnum1 etc// 
  let amount=parseInt(amnt1)
  return db.User.findOne({acno:acnum1,password:pswrd1}).then(user=>{
    if(user){
      if(user.balance>amount){
        user.balance-=amount
        user.transaction.push({type:'DEBIT',amount})
        user.save();
        return {
          statusCode:200,
          status:true,
          message:`${amount} has been withdrawn and your current balance is ${user.balance}`
      }
    }
    else{
      return {
        statusCode:401,
        status:false,
        message:'insufficient balance'
      }
    }
  }
 else{
  return {
    statusCode:401,
    status:false,
    message:'incorrect acnumber or password'
  }
}
})


}
const getTransaction =(acno)=> {
  return db.User.findOne({acno}).then(user=> {
    if(user){
    return{
      statusCode:200,
      status:true,
      transaction : user['transaction']
    }
  }
  else{
    return {
      statusCode:401,
      status:false,
      message:'user doesnt exist'
    }
  }
  })

  
  }

  const deleteAcc = (acno)=>{
    return db.User.deleteOne({acno}).then(user=>{
      if(user){
        return {
          statusCode:200,
          status:true,
          message:'Deleted Successfully'
        }
      }
      else{
        return{
          statusCode:401,
          status:false,
          message:'user doesnt exist'
        }
      }
    })
  }


module.exports={
  register,login,deposit,withdraw,getTransaction,deleteAcc
}
      