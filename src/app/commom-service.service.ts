import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommomServiceService {

  constructor() { }

  SetLocal(res){
    window.localStorage.setItem("auth",res.access_token)
    window.localStorage.setItem("UserName",res.userName)
    window.localStorage.setItem("token_type",res.token_type)
    window.localStorage.setItem("userEmail",res.userEmail)
    window.localStorage.setItem("userFullName",res.userFullName)
    window.localStorage.setItem("userId",res.userId)
    window.localStorage.setItem("roleId",res.roleId)
    window.localStorage.setItem("userType",res.userType)
    window.localStorage.setItem("lastlogindate",res.lastlogindate)
  }
  
  RemoveLocal(){
  window.localStorage.clear();

  }

  GetLocalauth(){
      let val = window.localStorage.getItem("auth")
    return val 
    }
    GetLocalUserName(){
      let val  = window.localStorage.getItem("UserName")
      return val
    }
    GetLocaltoken_type(){
    return window.localStorage.getItem("token_type")
    }
    GetLocaluserEmail(){
    let val =window.localStorage.getItem("userEmail")
      return val
    }
    GetLocaluserFullName(){
      let val = window.localStorage.getItem("userFullName")
      return val
    }
    GetLocaluserId(){
      let val =  window.localStorage.getItem("userId")
      return val 
    }
    GetLocalroleId(){
      let val = window.localStorage.getItem("roleId")
    return val
    }
    GetLocaluserType(){
      let val = window.localStorage.getItem("userType")
    return val
    }
    GetLocallastlogindate(){
      let val = window.localStorage.getItem("lastlogindate")
      return val
    }
}
