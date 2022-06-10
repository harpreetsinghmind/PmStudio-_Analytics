import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GridAllModule, PagerModule, ExcelExportService } from '@syncfusion/ej2-angular-grids';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';
import { UpdatePasswordComponent } from './updatepassword/updatepassword.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePickerModule,CalendarModule } from '@syncfusion/ej2-angular-calendars';

import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToasterComponent } from './toaster/toaster.component';
import { AuthGuard } from './auth.guard';
import { ToasterContainerComponent } from './toaster/toaster-container.component';
import * as $ from "jquery";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import  * as PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import  * as TreeMap from 'fusioncharts/fusioncharts.treemap';
import * as Overlappedcolumn2d from "fusioncharts/fusioncharts.overlappedcolumn2d";
import { DatePipe } from '@angular/common';
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
// Pass the fusioncharts library and chart modules

import { SidebarComponent } from './sidebar/sidebar.component';

import {DecimalPipe} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PowerBIReportComponent } from './power-bireport/power-bireport.component';
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme,PowerCharts,TreeMap,Overlappedcolumn2d);

//FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);



//FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);

// Pass the fusioncharts library and chart modules
//FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    DashboardComponent,
    UpdatePasswordComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ToasterComponent,
    ToasterContainerComponent,
    PowerBIReportComponent

  ],
  imports: [
    BrowserModule,
    GridModule,
    DatePickerModule,
    ScheduleAllModule,
    FormsModule,
    CalendarModule,
    GridAllModule,
    ProgressBarModule,
    PagerModule,
    RecurrenceEditorAllModule,
    ScheduleModule,
    MultiSelectAllModule,
    HttpClientModule ,
    HttpModule ,
    AppRoutingModule,
    FusionChartsModule
  ],
  providers: [ExcelExportService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    DatePipe,
    DecimalPipe

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
