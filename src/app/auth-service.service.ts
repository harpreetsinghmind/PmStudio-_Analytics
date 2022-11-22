import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DatePipe ,DecimalPipe} from '@angular/common'

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any> ;

  constructor(private httpClient: HttpClient ,private datePipe:DatePipe,private decimalpipe:DecimalPipe) {

    this.DateFormat= this.getdateFormat();
    this.Decimalformat = this.getdecimalFormat();
   }
 

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  setUsername(data: string) {
    localStorage.setItem(btoa("userName"), btoa(data));
  }

  setUserImage(data: string) {
    localStorage.setItem(btoa("UserImage"), btoa(data));
  }
  setComponyImage(data: string) {
    localStorage.setItem(btoa("ComponyImage"), btoa(data));
  }
  setUserEmail(data: string) {
    localStorage.setItem(btoa("UserEmail"), btoa(data));
  }
  getUserImage() {
    let un = localStorage.getItem(btoa("UserImage"));
    un = un === null ? un : atob(un);
    return un;
  }
  getComponyImage() {
    let un = localStorage.getItem(btoa("ComponyImage"));
    un = un === null ? un : atob(un);
    return un;
  }
  getUserEmail() {
    let un = localStorage.getItem(btoa("UserEmail"));
    un = un === null ? un : atob(un);
    return un;
  }

  getUserId() {
    let un = localStorage.getItem(btoa("userId"));
    un = un === null ? un : atob(un);
    return un;
  }
  getUsername() {
    let un = localStorage.getItem(btoa("userName"));
    un = un === null ? un : atob(un);
    return un;
  }
  setdecimalFormat(decimalFormat: any){
    localStorage.setItem(btoa("decimalFormat"), btoa(decimalFormat));
  }
  setdateFormat(dateFormat: any){
    localStorage.setItem(btoa("dateFormat"), btoa(dateFormat));
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
  setcompanyCode(CmpCode: string) {
    localStorage.setItem(btoa("companyCode"), btoa(CmpCode));
  }
  getcompanyCode() {
    let ut = localStorage.getItem(btoa("companyCode"));
    ut = ut === null ? ut : atob(ut);
    return ut;
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
  getdateFormat() {
    let ut = localStorage.getItem(btoa("dateFormat"));
    ut = ut === null ? ut : atob(ut);
    return ut;
  }
  getdecimalFormat() {
    let ut = localStorage.getItem(btoa("decimalFormat"));
    ut = ut === null ? ut : atob(ut);
    return ut;
  }
  DateFormat:any
  Dateformat(datas:string){
    this.DateFormat= this.getdateFormat();
    if (this.DateFormat=='1')
    {
      return this.datePipe.transform(datas, 'MM/dd/yyyy')   
    }
    if(this.DateFormat=='2')
    {
      return this.datePipe.transform(datas, 'dd/MM/yyyy')
    }
    if(this.DateFormat== '3')
    {
      return this.datePipe.transform(datas, 'yyyy/MM/dd')
    } 
  }

  Decimalformat:any;
  DecimalFormat(datas:string) {
    this.Decimalformat = this.getdecimalFormat();
    if (this.Decimalformat=='0')
    {return this.decimalpipe.transform(datas, '1.0-0')}
    if (this.Decimalformat=='1')
    {return this.decimalpipe.transform(datas, '.1-1')}
    if (this.Decimalformat=='2')
    {return this.decimalpipe.transform(datas, '.2-2')}
  }

 
  CurrencySymbols(data: any){
    switch (data) {
      case 'USD':
        return "assets/img/CURRENCY-SYMBOLS/USD.png";
        break;
      case 'AUD':
        return "assets/img/CURRENCY-SYMBOLS/AUD.png";
        break;
      case 'BGN':
        return "assets/img/CURRENCY-SYMBOLS/BGN.png";
        break;
      case 'BRL':
        return "assets/img/CURRENCY-SYMBOLS/BRL.png";
        break;
      case 'CAD':
        return "assets/img/CURRENCY-SYMBOLS/CAD.png";
        break;
      case 'CHF':
        return "assets/img/CURRENCY-SYMBOLS/CHF.png";
        break;
      case 'CNY':
        return "assets/img/CURRENCY-SYMBOLS/CNY.png";
        break;
      case 'CZK':
        return "assets/img/CURRENCY-SYMBOLS/CZK.png";
        break;
      case 'DKK':
        return "assets/img/CURRENCY-SYMBOLS/DKK.png";
        break;
      case 'GBP':
        return "assets/img/CURRENCY-SYMBOLS/GBP.png";
        break;
      case 'HKD':
        return "assets/img/CURRENCY-SYMBOLS/HKD.png";
        break;
      case 'HRK':
        return "assets/img/CURRENCY-SYMBOLS/HRK.png";
        break;
      case 'HUF':
        return "assets/img/CURRENCY-SYMBOLS/HUF.png";
        break;
      case 'IDR':
        return "assets/img/CURRENCY-SYMBOLS/IDR.png";
        break;
      case 'ILS':
        return "assets/img/CURRENCY-SYMBOLS/ILS.png";
        break;
      case 'INR':
        return "assets/img/CURRENCY-SYMBOLS/INR.png";
        break;
      case 'ISK':
        return "assets/img/CURRENCY-SYMBOLS/ISK.png";
        break;
      case 'JPY':
        return "assets/img/CURRENCY-SYMBOLS/JPY.png";
        break;
      case 'KRW':
        return "assets/img/CURRENCY-SYMBOLS/KRW.png";
        break;
      case 'MXN':
        return "assets/img/CURRENCY-SYMBOLS/MXN.png";
        break;
      case 'MYR':
        return "assets/img/CURRENCY-SYMBOLS/MYR.png";
        break;
      case 'NOK':
        return "assets/img/CURRENCY-SYMBOLS/NOK.png";
        break;
      case 'NZD':
        return "assets/img/CURRENCY-SYMBOLS/NZD.png";
        break;
      case 'PHP':
        return "assets/img/CURRENCY-SYMBOLS/PHP.png";
        break;
      case 'PLN':
        return "assets/img/CURRENCY-SYMBOLS/PLN.png";
        break;
      case 'RON':
        return "assets/img/CURRENCY-SYMBOLS/RON.png";
        break;
      case 'RUB':
        return "assets/img/CURRENCY-SYMBOLS/RUB.png";
        break;
      case 'SEK':
        return "assets/img/CURRENCY-SYMBOLS/SEK.png";
        break;
      case 'SGD':
        return "assets/img/CURRENCY-SYMBOLS/SGD.png";
        break;
      case 'THB':
        return "assets/img/CURRENCY-SYMBOLS/THB.png";
        break;
      case 'TRY':
        return "assets/img/CURRENCY-SYMBOLS/TRY.png";
        break;
      case 'ZAR':
        return "assets/img/CURRENCY-SYMBOLS/ZAR.png";
        break;
      default:
        break;
    }
  }

}
