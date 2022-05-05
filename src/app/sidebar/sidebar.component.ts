import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private auth: AuthServiceService) { }

  ngOnInit(): void {
    // debugger;
this.roleid=this.auth.getRoleId();
  }
  roleid:any;


 displaytoggle:any='none';
  opentoggle() {
    if(this.displaytoggle=='block'){
      this.displaytoggle = "block";
    }else{
      this.displaytoggle = "none";
    }
  
  }
}
