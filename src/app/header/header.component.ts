import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import { Router } from '@angular/router';
import { CommomServiceService } from '../commom-service.service';
import { GlobalServiceService } from '../global-service.service';
import { ToasterService } from '../toaster/toaster.service';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private Http: GlobalServiceService,
    private router: Router,
     private toaster: ToasterService,
     private comon: CommomServiceService,
     private auth: AuthServiceService ) { }

     toggle='showed';
usertype:any;
  ngOnInit(): void {
    this.usertype=    this.auth.getRoleId()
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


 
  // closetoggle() {
  //   this.display = "none";
  // }


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
