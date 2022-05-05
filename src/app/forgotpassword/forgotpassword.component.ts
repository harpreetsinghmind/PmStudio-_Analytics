import { Component, OnInit } from '@angular/core';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import * as  forge from 'node-forge';
import { ToasterService } from '../toaster/toaster.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private route: ActivatedRoute, private router:Router,private auth: AuthServiceService
    ,  private toaster: ToasterService
    ) {}
token:string;
  ngOnInit() {
    debugger;
    
    this.token=this.route.snapshot.queryParamMap['params'].t
    console.log(this.route.snapshot.queryParamMap);
}


confirmPassword:string;
errorMessage
password:string;
hashedpassword:string;
C_pass: HTMLElement;
successmsg: boolean;
errormsg: boolean;
formSubmitted=false
handlechangerequest(){
  debugger;
  this.token;
  this.hashedpassword= forge.util.binary.hex.encode(forge.pkcs5.pbkdf2(this.password, 'a salt', 1000, 256/8));
  this.auth.requestchangepassword(this.hashedpassword,this.token).subscribe( res =>{
    console.log(res);
    if(res)
    {

      this.toaster.show('success',res);
      this.router.navigate(['/Login']);

      

      debugger;

      // this.toaster.show("success",res)
      // this.display='none';
    }else{
      // this.toaster.show("warning",'error')
    }

  }, error => {
    debugger;
    this.toaster.show('warning',error+' something went wrong');
    // this.toaster.show("warning",'error')
    // this.PasswordError = true
  });


  // let encryptedPassword  =
}
validateC(){
  debugger;
  if (
    /[A-Z]/.test(this.confirmPassword) && // uppercase letter is required
    /[a-z]/.test(this.confirmPassword) && // lowercase letter is required
    /[0-9]/.test(this.confirmPassword) && // number is required
    /[!@#$%]/.test(this.confirmPassword) && // predefined symbol is required
    this.confirmPassword.length > 7 // Min required // Min required
    // !/[^A-Za-z0-9!@#$%]/.test(this.password) // there is nothing unwanted 
)

  { 
  this.errorMessage = "";
  let C_pass1: HTMLElement = document.getElementsByClassName("for_C_pass")[0] as HTMLElement;
  this.C_pass = C_pass1;
  this.successmsg = true
  this.errormsg = false 
  this.formSubmitted = false; 
  // C_pass1.className = "e-input txtclass for_C_pass border-success" 
    return true;
}else{
  debugger;
}
this.errorMessage = "Confirm Password need to be strong";
let C_pass: HTMLElement = document.getElementsByClassName("for_C_pass")[0] as HTMLElement;
this.C_pass = C_pass;
this.formSubmitted = false; 
// C_pass.className = "e-input txtclass for_C_pass border-failed" 
this.errormsg = true
this.successmsg = false
return false;
}
}
