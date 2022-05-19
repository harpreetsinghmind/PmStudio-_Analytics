import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor(private _http: Http,private httpClient: HttpClient,) {


   }

   getl1l2report(productname,plc,port,startdate,enddate) {
     debugger;
     const headers = new Headers();
     let url =`https://demo.pm-studio.com/LGAPI/api/admin/GetL1L2RatioDataChart?ProductName=`+productname+`&PLC=`+plc+`&Port=`+port+`&StartDate=`+startdate+`&EndDate=`+enddate;
     console.log(url)
     headers.append('Content-Type', 'application/json');
   return this._http
     .get(url ,{ headers: headers })
     .pipe(map((res) => res.json()))

     .toPromise();
 }

 gettwentryfortyreport(productname,plc,port,startdate,enddate) {
  debugger;
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
return this._http
  .get(`https://demo.pm-studio.com/LGAPI/api/admin/GetTwentyFourtyRatioChart?ProductName=`+productname+`&PLC=`+plc+`&Port=`+port+`&StartDate=`+startdate+`&EndDate=`+enddate ,{ headers: headers })
  .pipe(map((res) => res.json()))

  .toPromise();
}


   getContainerRequests(userId:any,date: any,obu) {
     if(!date){
       date='2022-04-04'
     }
    //  debugger;
    const headers = new Headers();
    // let token = this.authService.getToken();
    // headers.append('Authorization', `bearer ${token}`)
    headers.append('Content-Type', 'application/json');
    return this._http
      .get(`https://demo.pm-studio.com/LGAPI/api/admin/GetContainerBooking?userId=`+userId+`&BookingDate=`+date+`&obu=`+obu ,{ headers: headers })
      .pipe(map((res) => res.json()))

      .toPromise();
  }

  getConfirmationRequests(date): Observable <any> {
 
   const headers = new Headers();
   // let token = this.authService.getToken();
   // headers.append('Authorization', `bearer ${token}`)
   headers.append('Content-Type', 'application/json');
   return this._http
     .get(`https://demo.pm-studio.com/LGAPI/api/admin/GetContainerConfiration?userId=4&Date=`+date ,{ headers: headers }).pipe(map((res) => res.json()))
   
 }

 getusers(): Observable <any> {
   debugger;
 
  const headers = new Headers();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  return this._http
    .get(`https://demo.pm-studio.com/lgapi/api/accounts/Getuserlist?userid=0` ,{ headers: headers }).pipe(map((res) => res.json()))
  
}



updateContainersRequest(parms): Observable<any> {
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/UpdateContainerBooking";
  return this.httpClient.post(URL, parms,{headers:headers})
    
}

createSupplier(parms): Observable<any> {
  debugger;
  parms=parms.value;
  let data={
    id:0,
    OrgName:parms.name,
    OrgCode:parms.orgcode,
    IncoTerm:parms.inco,
    SupplierName:parms.supplier,
    SupplierCode:parms.scode,
    MainItemCMDT:parms.cmdt,
    Country:parms.country,
    PortOfLoading:parms.l1,
    PortOfLoadingTwo:parms.l2,
    PortOfLoadingThree:parms.l3,
   
  }
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/SaveSupplier";
  return this.httpClient.post(URL, data,{headers:headers})
    
}





updatesupplier(parms,id): Observable<any> {
  debugger;
  parms=parms.value;
  let data={
    Id:id,
    OrgName:parms.name,
    OrgCode:parms.orgcode,
    IncoTerm:parms.inco,
    SupplierName:parms.supplier,
    SupplierCode:parms.scode,
    MainItemCMDT:parms.cmdt,
    Country:parms.country,
    PortOfLoading:parms.l1,
    PortOfLoadingTwo:parms.l2,
    PortOfLoadingThree:parms.l3,
  }
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/SaveSupplier";
  return this.httpClient.post(URL, data,{headers:headers})
    
}




uploadimage(parms): Observable<any> {
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'multipart/form-data');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/UploadContainerFile";
  return this.httpClient.post(URL, parms,{headers:headers})
    
}

updateprimstatus(parms): Observable<any> {
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/UpdatePrimeStatus";
  return this.httpClient.post(URL, parms,{headers:headers})
    
}


createUser(parms): Observable<any> {
  debugger;
  parms=parms.value;
 
  let data={
    userid:0,
    UserName:parms.name,
UserType:parms.usertype,
PhoneNumber:parms.phone,
Email:parms.email,
roleId:parms.role,
status:parms.status
  }
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/Accounts/UserRegister";
  return this.httpClient.post(URL, data,{headers:headers})
    
}

editUser(parms,user, create): Observable<any> {
  debugger;
 
  let data={
    UserName:parms.firstName,
    usertype:parms.usertype,
PhoneNumber:parms.phonenumber,
userId: user,
createdy : create,
Email:parms.email,
roleid:parms.roleid,
status:parms.status



  }
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/Accounts/UserRegister";
  debugger;
  return this.httpClient.post(URL, data,{headers:headers})
}




updateConfirmRequest(parms): Observable<any> {
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/SaveConfirmContainer";
  return this.httpClient.post(URL, parms,{headers:headers})
    
}

getVisibilityRequest(Start, End,productname,plc,port): Observable<any> {
  const headers = new HttpHeaders();
  
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetContainerBookingData?ProductName="+productname+"&PLC="+plc+"&Port="+port+"&StartDate="+Start+"&EndDate="+End;
  return this.httpClient.get(URL,{headers:headers})
    
}

getPremiumRatioChart(Start, End, productname,pic,port): Observable<any> {
  if(!productname){
    productname=''
  }
  if(!pic){
    pic=''
  }
  if(!port){
    port=''
  }
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetPremiumRatioChart?ProductName="+productname+"&PLC="+pic+"&Port="+port+"&StartDate="+Start+"&Enddate="+End;
  return this.httpClient.get(URL,{headers:headers})
    
}

getsupplierGrid(): Observable<any> {
  // if(!productname){
  //   productname=''
  // }
  // if(!pic){
  //   pic=''
  // }
  // if(!port){
  //   port=''
  // }
  const headers = new HttpHeaders();
 
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/lgapi/api/admin/GetAllSupplier"
  return this.httpClient.get(URL,{headers:headers})
    
}


getPremiumreportGrid(Start, End, status,product,pic,port): Observable<any> {
  
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetPremiumReport?userId=1&StartDate="+Start+"&Status="+status+"&EndDate="+End+"&ProductName="+product+"&Port="+port+"&PLC="+pic 
  return this.httpClient.get(URL,{headers:headers})
    
}

getmdapprovalGrid(startdate:any,status:any): Observable<any> {
  
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetContainerConfirmationPrem?userId=1&Date="+startdate+"&Status="+status
  return this.httpClient.get(URL,{headers:headers})
    
}


GetContainerBookingChart(Start, End,productname,pic,port): Observable<any> {
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetContainerBookingChart?ProductName="+productname+"&PLC="+pic+"&Port="+port+"&StartDate="+Start+"&Enddate="+End;
  return this.httpClient.get(URL,{headers:headers})
    
}
GetL1L2RatioChart(Start, End, productname,pic,port): Observable<any> {
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetL1l2RatioChart?ProductName="+productname+"&PLC="+pic+"&Port="+port+"&StartDate="+Start+"&Enddate="+End;
  return this.httpClient.get(URL,{headers:headers})
    
}

getRatioChart(Start, End, productname,pic,port): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL ="https://demo.pm-studio.com/LGAPI/api/admin/GetRatioChart?ProductName="+productname+"&PLC="+pic+"&Port="+port+"&StartDate="+Start+"&Enddate="+End;
  return this.httpClient.get(URL,{headers:headers})
    
}


// loginUser(username: string, password: string ): Observable<any> {
//   debugger;
//   const formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);
//   // formData.append('ClientId', cmp);
//   formData.append('grant_type', 'password');

//   const userData = "password=" + password + "&grant_type=password"+"&username="+username;
//   const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
//   return this.httpClient.post(`https://demo.pm-studio.com/api/api/oauth/token`, userData, { headers: reqHeader })
// }


loginUser(username: string, password: string , cmp): Observable<any> {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('ClientId', cmp);
  
  formData.append('grant_type', 'password');

  const userData = "ClientId=" + cmp + "&password=" + password + "&grant_type=password"+"&username="+username;
  const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  return this.httpClient.post(`https://demo.pm-studio.com/api/oauth/token`, userData, { headers: reqHeader });
}

getPbiReportDetail(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  //const URL ="${environment.apiUrl}pbiPeople/getPbiPeopleDetail?year="+year+"&cmpcode="+cmpcode;
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleDetail?year=`+year+"&cmpcode="+cmpcode
 //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleDetail?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})
  
    
}

getPbiProjectDetail(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/GetPbiProjectDetail?year=`+year+"&cmpcode="+cmpcode

  //const URL ="${environment.apiUrl}pbiPeople/GetPbiProjectDetail?year="+year+"&cmpcode="+cmpcode;
 //const URL ="http://localhost:63000/api/pbiPeople/GetPbiProjectDetail?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})
  
    
}

getPbiPeopleResources(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  //const URL ="${environment.apiUrl}pbiPeople/GetPbiPeopleResourceEmployee?year="+year+"&cmpcode="+cmpcode;
  const URL=`${environment.apiUrl}pbiPeople/GetPbiPeopleResourceEmployee?year=`+year+"&cmpcode="+cmpcode
 //const URL ="http://localhost:63000/api/pbiPeople/GetPbiPeopleResourceEmployee?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})
  
    
}
getPbiReportDesignation(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleDesignation?year=`+year+"&cmpcode="+cmpcode

  //const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleDesignation?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleDesignation?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}


getPbiReportDepartment(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');

  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleDepartment?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleDepartment?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleDepartment?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}

getPbiReportLocation(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleLocation?year=`+year+"&cmpcode="+cmpcode


 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleLocation?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleLocation?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}


getPbiReportJobband(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleJobband?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleJobband?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleJobband?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}

getPbiReportGender(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleGender?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleGender?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleGender?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}
etPbiReportEmployeeVsVendor(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleEmployeeVsVendor?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleEmployeeVsVendor?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleEmployeeVsVendor?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}

etPbiReportEmployeeAddition(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleEmployeeAddition?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleEmployeeAddition?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleEmployeeAddition?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}
getPbiReportEmployeeTenureWiseEmployeeDetail(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/GetPbiPeopleTenureWiseEmployee?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/GetPbiPeopleTenureWiseEmployee?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/GetPbiPeopleTenureWiseEmployee?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}
getPbiReportEmployeePerformance(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleEmployeePerformance?year=`+year+"&cmpcode="+cmpcode

  //const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleEmployeePerformance?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleEmployeePerformance?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}

etPbiReportEmployeeAttrition(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleEmployeeAttrition?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleEmployeeAttrition?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleEmployeeAttrition?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}

getPbiReportAge(year,cmpcode): Observable<any> {
  // debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/getPbiPeopleAge?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/getPbiPeopleAge?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/getPbiPeopleAge?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}
getPbiProjectEmployeeVsVendor(year,cmpcode): Observable<any> {
   debugger;
  const headers = new HttpHeaders();
  // let token = this.authService.getToken();
  // headers.append('Authorization', `bearer ${token}`)
  headers.append('Content-Type', 'application/json');
  const URL=`${environment.apiUrl}pbiPeople/GetPbiProjectEmployeeVsVendor?year=`+year+"&cmpcode="+cmpcode

 // const URL ="https://demo.pm-studio.com/api/api/pbiPeople/GetPbiProjectEmployeeVsVendor?year="+year+"&cmpcode="+cmpcode;
  //const URL ="http://localhost:63000/api/pbiPeople/GetPbiProjectEmployeeVsVendor?year="+year+"&cmpcode="+cmpcode;

  return this.httpClient.get(URL,{headers:headers})

}

getPbiProjectDeployeeVsBench(year,cmpcode): Observable<any> {
 const headers = new HttpHeaders();
 // let token = this.authService.getToken();
 // headers.append('Authorization', `bearer ${token}`)
 headers.append('Content-Type', 'application/json');
 const URL=`${environment.apiUrl}pbiPeople/GetPbiProjectDeployeVsBench?year=`+year+"&cmpcode="+cmpcode

// const URL ="https://demo.pm-studio.com/api/api/pbiPeople/GetPbiProjectEmployeeVsVendor?year="+year+"&cmpcode="+cmpcode;
 //const URL ="http://localhost:63000/api/pbiPeople/GetPbiProjectDeployeVsBench?year="+year+"&cmpcode="+cmpcode;

 return this.httpClient.get(URL,{headers:headers})

}


}