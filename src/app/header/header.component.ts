import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import { Router } from '@angular/router';
import { CommomServiceService } from '../commom-service.service';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toaster/toaster.service';
import { AuthServiceService } from '../auth-service.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName
  userEmail
  userComponyImage
  UserImage
  AppUrl
  constructor(private Http: GlobalServiceService,
    private router: Router,
    private change: ChangeDetectorRef,
     private toaster: ToasterService,
     private comon: CommomServiceService,
     private datePipe: DatePipe,
     private auth: AuthServiceService ) { }

     toggle='showed';
usertype:any;
  now:any = this.datePipe.transform(new Date(),'EEE, MMM d, y HH:mm');
  ngOnInit(): void {
    this.AppUrl = environment.domainUrl
    this.userId = this.auth.getUserId()
    this.userName = this.auth.getUsername()
    this.usertype   =   this.auth.getRoleId()
    this.userEmail  =   this.auth.getUserEmail()
 

    setInterval(() => {
          // if(this.timeformat==1)
          // {
            this.now = new Date();
            let date=  this.datePipe.transform(this.now,'EEE, MMM d, y HH:mm');
            this.now= date;
          // }else{
          //   this.now = new Date();
          //   let date=  this.datePipe.transform(this.now,'EEE, MMM d, y hh:mm a');
          //   this.now= date;
          // }
    }, 1000);
    this.userComponyImage  =  environment.siteUrl+this.auth.getComponyImage()
    this.UserImage  =   environment.siteUrl+this.auth.getUserImage()
    $(document).ready(function() {
      $(".sidebar-dropdown > a").click(function() {
        debugger;
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });
     
    //  debugger;
      
      $("#close-sidebar").click(function() {
        debugger;
        let toggling = $("#toggling").val();
        if(toggling=='showed' || toggling==undefined){
          // toggling='notshowed';
          document.getElementById("toggling").setAttribute('value','notshowed');
          $(".page-wrapper").removeClass("toggled");
          $(".layoutset").addClass("layoutsetPREM");

        }else{
          // toggling='showed';
          document.getElementById("toggling").setAttribute('value','showed');
          $(".page-wrapper").addClass("toggled");
          $(".layoutset").removeClass("layoutsetPREM");
        }
     
      });
      $("#show-sidebar").click(function() {
      
      });
      
    });

  }


 
 userId


  Logout(){
  this.comon.RemoveLocal();
  this.router.navigate(['Login']);
  }

  update(){
    debugger;
    // this.comon.RemoveLocal();
    this.router.navigate(['updatepassword']);
    }
}
