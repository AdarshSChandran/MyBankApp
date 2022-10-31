import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  aim = 'Your Perfect Banking Partner';
  placeHolder = 'Enter your account number';
  acno = '';
  psw = '';

  loginForm=this.fb.group({
    /*here we can give + and * .... + for minimum there should be 1 character
    and for more details google it*/
  acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
  psw:['',[Validators.required,Validators.pattern('[A-Za-z0-9]+')]]
  })


  constructor(private router:Router, private ds:DataService,private fb:FormBuilder) {}

  ngOnInit(): void {}

  login(){
    var acnum=this.loginForm.value.acno
    var psw=this.loginForm.value.psw
    

    if(this.loginForm.valid){
      this.ds.login(acnum,psw).subscribe((result:any)=>{
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser))
        localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
        localStorage.setItem('token',JSON.stringify(result.token))
        alert(result.message)
        this.router.navigateByUrl('dashboard')
      },
      result=>{
        alert(result.error.message)

      }
      ) 
  
    }
    
    else{
      alert('invalid form')
    }
  }
}
    

  // login(a: any, b: any) {
  //   // console.log(a.value);
  //   // console.log(b.value);

  //   var acnum = a.value;
  //   var psw = b.value;
  //   let userDetails = this.userDetails;
  //   if (acnum in userDetails) {
  //     if (psw == userDetails[acnum]['password']) {
  //       alert('login success');
  //     } else {
  //       alert('password incorrect');
  //     }
  //   } else {
  //     alert('account doesnt exist or incorrect account number');
  //   }
  //   // alert('login successful')
  // }

  // acnoChange(event: any) {
  //   this.acno = event.target.value;
  //   // console.log(this.acno);
  // }
  // pswChange(event: any) {
  //   this.psw = event.target.value;
  //   // console.log(this.psw);
  // }
