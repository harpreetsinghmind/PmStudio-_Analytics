import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommomServiceService } from './commom-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  CurrentUser: any;
  constructor(private common: CommomServiceService, private myRoute: Router) {
  
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let auth  = this.common.GetLocalauth();
    if(auth != null || auth != undefined){
      return true;
    }else{
      this.myRoute.navigate(['/Login'])
    }
  

  }
  
}
