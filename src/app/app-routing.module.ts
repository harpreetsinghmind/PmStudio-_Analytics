import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { UpdatePasswordComponent } from './updatepassword/updatepassword.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { PowerBIReportComponent } from './power-bireport/power-bireport.component';
import { AuthGuard } from "./auth.guard";



const routes: Routes = [
  {path:"Login", component:LoginComponent},
  {path:"resetpassword", component:ResetPasswordComponent},
  {path:"updatepassword", component:UpdatePasswordComponent},
  {path:"reset-password", component:ForgotPasswordComponent},
  {path:"", component:DashboardComponent, canActivate: [AuthGuard]},
  {path:"Dashboard", component:DashboardComponent, canActivate: [AuthGuard] },
  {path:"PowerBIReport", component:PowerBIReportComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
