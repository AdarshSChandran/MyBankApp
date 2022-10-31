import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// overloaded header
const options = {
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {



  constructor(private http:HttpClient) { 
  }



  

  register(acno:any,username:any,password:any){

    const data = {acno,username,password}
    return this.http.post('http://localhost:3000/register',data)
  }

  login(acnum:any,psw:any){
    const data = {acnum,psw}
    return this.http.post('http://localhost:3000/login',data)
  }

  getToken(){
    // fetch the token from local Storage
    const token = JSON.parse(localStorage.getItem('token') || '');

    //1. append token inside headers

      //1.2 create header
      let headers = new HttpHeaders();
      //1.3 append token to header
      if(token){
        options.headers = headers.append('token1',token)             
      }
      return options;

  }

  
  deposit(acnum:any,pswrd:any,amnt:any){
    const data = {acnum,pswrd,amnt}
    return this.http.post('http://localhost:3000/deposit',data,this.getToken())
  }

  withdraw(acnum1:any,pswrd1:any,amnt1:any){  // here in argument we dont need to necessarily give the same name like acnum1 etc// 
    const data = {acnum1,pswrd1,amnt1}
    return this.http.post('http://localhost:3000/withdraw',data,this.getToken())
  }

  getTransaction(acno:any){
    const data = {acno}
    return this.http.post('http://localhost:3000/transaction',data,this.getToken()) 
   }

  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteacc/'+acno)
  }

}
