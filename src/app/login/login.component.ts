import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toaster/toaster.service';
import { CommomServiceService } from '../commom-service.service';
import * as  forge from 'node-forge';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  PasswordError: boolean = false;
  email
  password
  cmp
  Require = false
  display = "none";
  forgotPassword: any = {};
  showLoader: boolean;
  resetPasswordSubmitted = false;

  constructor(private Http: GlobalServiceService,
    private router: Router,
    private common: CommomServiceService,
     private toaster: ToasterService,
     private auth: AuthServiceService) { }
 

     openModal() {
      this.display = "block";
    }
    onCloseHandled() {
      this.display = "none";
    }
    resetForgotPasswordForm() {
      this.forgotPassword = { email: '', message: '' };
    }

    isdisbaled=false;
    HandleResetPassword(){
      debugger;
    let email=  this.forgotPassword.email
    this.isdisbaled=true;
    this.auth.getForgotPasswordToken(email).subscribe( res =>{
      console.log(res);
      if(res)
      {
        this.isdisbaled=false;
        this.forgotPassword.email=''
        this.toaster.show("success",res)
        this.display='none';
      }else{
        this.toaster.show("warning",'error')
      }

    }, error => {
      this.isdisbaled=false;
      this.toaster.show("warning",'error')
      // this.PasswordError = true
    });
    console.log(email);
    }
  
  ngOnInit(): void {
    let auth = this.common.GetLocalauth()
    // if(auth != null || auth != undefined){
    //   this.router.navigate(['Dashboard']);
    // }
       this.router.navigate(['PowerBIReport']);


    

  

   
    this.forgotPassword = { email: '', message: '' };
  }

 Login(val){
   debugger
   if(
     val.form.value.password == undefined || val.form.value.password == "" || val.form.value.password == null ||
     val.form.value.username == undefined || val.form.value.username == "" || val.form.value.username == null

   ){
    this.Require =  true
    return
   }
   this.Require =  false
   let encryptedPassworda  = forge.util.binary.hex.encode(forge.pkcs5.pbkdf2(val.form.value.password, 'a salt', 1000, 256/8));

   let encryptedPassword  = forge.util.binary.hex.encode(forge.pkcs5.pbkdf2(val.form.value.password, 'a salt', 1000, 256/8));
   let password = encryptedPassworda
   try {
    this.Http.loginUser(val.form.value.username,  password,null).subscribe( res =>{
      debugger;

        
      
        this.common.SetLocal(res);
        this.PasswordError = false
        
        //pantos role=1;
        //supplier role=3;
        //pic role=2
let obu= res.OBU ? res.OBU: '0';
this.auth.setOBU(obu);
this.auth.setUserId(res.userId);

        
        let roleid=res.roleId;
        // let roleid='2';
        this.auth.setRoleId(roleid);
        if(roleid=='1'){
          this.router.navigate(['PantosConfirmation']);
        }
        if(roleid=='0'){
          this.router.navigate(['Dashboard']);
        }
        if(roleid=='2'){
          this.router.navigate(['Dashboard']);
        }
        if(roleid=='12'){
          this.router.navigate(['Dashboard']);
        }
    //  let userid=   this.auth.getUserId();
    //  console.log(userid);
     

  

    }, error => {
      this.PasswordError = true
    });
   } catch (error) {
  
   }
 }
}
