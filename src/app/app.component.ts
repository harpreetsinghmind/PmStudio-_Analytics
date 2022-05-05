import { Component, OnInit } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { CommomServiceService } from './commom-service.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent implements OnInit {
  title = 'LGDashboard';
  header = false

  constructor(private common: CommomServiceService,private router: Router){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        debugger;
        if (event.url === '/Login' || event.url ==='/resetpassword'||  (event.url.includes('reset-password')  ) ){
          this.header= false;
        } else {
          this.header= true;
        }
      }
    });

  }
  
  ngOnInit(): void {
    
  }
}
