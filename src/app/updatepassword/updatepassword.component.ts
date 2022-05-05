import { Component } from '@angular/core';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatePasswordComponent {
  confirmPassword:string;
  errorMessage
  password:string;
  C_pass: HTMLElement;
  successmsg: boolean;
  errormsg: boolean;
  formSubmitted=false
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
