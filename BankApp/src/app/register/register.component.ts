import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname='';
  acno='';
  pswd='';
  // model for registration form
  registerForm=this.fb.group({
                                                /*here we can give + and * .... + for minimum there should be 1 character
                                                and for more details google it*/
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pswd:['',[Validators.required,Validators.pattern('[A-Za-z0-9]+')]]
  })

  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }
                    //database//
  ngOnInit(): void {
  }

  register(){

    // console.log(this.registerForm.get('uname')?.errors);

    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var pswd=this.registerForm.value.pswd
    

    if(this.registerForm.valid){

    this.ds.register(acno,uname,pswd).subscribe((result:any)=>{

      alert(result.message)
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message);
    }
    )
  }
    
    else{
      alert('invalid form')
    }
  }

}
