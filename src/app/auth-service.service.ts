import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any> ;

  constructor(private httpClient: HttpClient) { }
 

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  setUsername(userName: string) {
    localStorage.setItem(btoa("userName"), btoa(userName));
  }

  getUserId() {
    let un = localStorage.getItem(btoa("userId"));
    un = un === null ? un : atob(un);
    return un;
  }

  getForgotPasswordToken(email: string): Observable<any> {
    debugger;
    var userData = "email=" + email;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.httpClient.post(`https://demo.pm-studio.com/LGAPI/api/accounts/ForgotPassword`, userData, { headers: reqHeader });
  }

  requestchangepassword(email: string,token): Observable<any> {
    debugger;
    var userData = "password=" + email +"&token="+token;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    //https://app.pm-studio.com/api/api//Accounts/ResetPassword
    return this.httpClient.post(`https://demo.pm-studio.com/LGAPI/api/Accounts/ResetPassword`, userData, { headers: reqHeader });
  }


  setUserId(userId: string) {
    localStorage.setItem(btoa("userId"), btoa(userId));
  }
  getRoleId() {
    let un = localStorage.getItem(btoa("roleId"));
    un = un === null ? un : atob(un);
    return un;
  }

  setRoleId(roleId: any){
    localStorage.setItem(btoa("roleId"), btoa(roleId));
  }
  setOBU(roleId: any){
    localStorage.setItem(btoa("obu"), btoa(roleId));
  }
  getObu() {
    let un = localStorage.getItem(btoa("obu"));
    un = un === null ? un : atob(un);
    return un;
  }

  // loginUser(username: string, password: string , cmp): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('username', username);
  //   formData.append('password', password);
  //   // formData.append('ClientId', cmp);
    
  //   formData.append('grant_type', 'password');

  //   const userData = "ClientId=" + cmp + "&password=" + password + "&grant_type=password"+"&username="+username;
  //   const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   return this.httpClient.post(`${environment.authUrl}`, userData, { headers: reqHeader });
  // }


  // setToken(token: string, expiry: string) {
  //   let up = localStorage.getItem(btoa('Permission'));
  //   up = up === null ? up : atob(up);
  //   this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(up));
  //   this.currentUser = this.currentUserSubject.asObservable();
  //   localStorage.setItem(btoa("LoggedInUser"), btoa(token));
  //   localStorage.setItem(btoa("tokenExpiry"), btoa(expiry));
  // }
}
