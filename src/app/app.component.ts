import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hide = true;
  constructor(public authService :AuthService , private router : Router){
    this.router.events.subscribe((r: Event)=>{
      if(r instanceof NavigationEnd){
        // if(this.router.url.includes('auth') && this.router.url.includes('?')){
        //   this.authService.logout();
        // }
        if(!this.router.url.includes('auth')){
          if(this.authService.componentHideSubject){
            this.hide = false;
          }
        }
      }
    })

    console.log(this.authService.componentHideSubject);
  }
  title = 'thingworx-data-table';
}
