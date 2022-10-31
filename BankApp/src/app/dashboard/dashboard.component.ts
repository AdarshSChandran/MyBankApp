import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user=''

  sDetails:any

  acnum:any;


  dashboardDepositForm=this.fb.group({
    /*here we can give + and * .... + for minimum there should be 1 character
    and for more details google it*/
  acnum:['',[Validators.required,Validators.pattern('[0-9]+')]],
  pswrd:['',[Validators.required,Validators.pattern('[A-Za-z0-9]+')]],
  amnt:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })

  dashboardWithdrawform=this.fb.group({
    acnum1:['',[Validators.required,Validators.pattern('[0-9]+')]],
    pswrd1:['',[Validators.required,Validators.pattern('[A-Za-z0-9]+')]],
    amnt1:['',[Validators.required,Validators.pattern('[0-9]+')]]
  })
  


  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) { 
    if(localStorage.getItem('currentUser')){

      this.user=JSON.parse(localStorage.getItem('currentUser') || '')
    }
      this.sDetails=new Date()
    }

  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('Please Login')
      this.router.navigateByUrl('')
    }
  }
  deposit(){
    var acnum=this.dashboardDepositForm.value.acnum
    var pswrd=this.dashboardDepositForm.value.pswrd
    var amnt=this.dashboardDepositForm.value.amnt

    if(this.dashboardDepositForm.valid){
    this.ds.deposit(acnum,pswrd,amnt).subscribe((result:any)=>{

      alert(result.message)
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


    

  withdraw(){
    var acnum1=this.dashboardWithdrawform.value.acnum1
    var pswrd1=this.dashboardWithdrawform.value.pswrd1
    var amnt1=this.dashboardWithdrawform.value.amnt1

    if(this.dashboardWithdrawform.valid){
    this.ds.withdraw(acnum1,pswrd1,amnt1).subscribe((result:any)=>{

      alert(result.message)
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
  logout(){
    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('token') 
    this.router.navigateByUrl('')
  
  }

  deleteconfirm(){
    this.acnum=JSON.parse(localStorage.getItem('currentAcno') || '')
  }
  oncancel(){
    this.acnum=''
  }
  onDelete(event:any){
    this.ds.deleteAcc(event).subscribe((result:any)=>{
      alert(result.message)
      this.logout();
    },
    result=>{
      alert(result.error.message)
    }    
    )
    
  }


}
