// server creation

// 1. import express and store it in a constant variable
const express = require('express');

// importing library for token
const jwt = require('jsonwebtoken')

const cors = require('cors')

// const req = require('express/lib/request');

// 2. app creation using express
const app = express()

// give command to share datas via cors
app.use(cors({origin:'http://localhost:4200'}))

// to parse json datas from req body
app.use(express.json())


// 3. create port number - use 3000 series port numbers
app.listen(3000,()=>{console.log('server started at port number 3000');}) 


// import dataservice file from service folder to use register function
const dataService = require('./service/dataservice')

// register - Post
app.post('/register',(req,res)=>{
    console.log(req.body);
    // its a response of asynchronous request, so nwe cant store the output in a variable, so we use then method and store it in an argument
     dataService.register(req.body.acno,req.body.username,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result) 
    })
      
})

// middleware creation -  to check token is valid - verify()
const jwtmiddleware=(req,res,next)=>{

    // when we dont give try and catch, when the token is wrong, it will give a server error,so we need to convert it as user error

    try{
        console.log('router specific middlewear started....');
        //the token from client
        token=req.headers['token1']
        // validate token
        const data = jwt.verify(token,'secretkey123')
        console.log(data);
    
        // to take next request after the working of middlewear
        next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:'please login'
        })
    }
   
}


// login
app.post('/login',(req,res)=>{
    console.log(req.body);
    dataService.login(req.body.acnum,req.body.psw).then(result =>{
        res.status(result.statusCode).json(result)   

    })
})

// deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{

    
        console.log(req.body);
        dataService.deposit(req.body.acnum,req.body.pswrd,req.body.amnt).then(result =>{
            res.status(result.statusCode).json(result)   

        })
    
    })
    
    
    
  




// withdraw

app.post('/withdraw',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acnum1,req.body.pswrd1,req.body.amnt1).then(result=>{
        res.status(result.statusCode).json(result)   

    })
})

// transaction history

app.post('/Transaction',jwtmiddleware,(req,res)=>{
    console.log(req.body);
    dataService.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)   
    })

})

// delete
app.delete('/deleteacc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
})


// resolve https request
// GET request
// app.get('/',(req,res)=>{     // - here we give slash in the string because to make it as landing page and where to get request 
//     res.send('get method.......')
// })                         

// // Post request
// app.post('/',(req,res)=>{
//     res.send('post method')
// })   

// // Put request
// app.put('/',(req,res)=>{
//     res.send('put method')
// })

// // Patch request
// app.patch('/',(req,res)=>{
//     res.send('patch method')
// })   


