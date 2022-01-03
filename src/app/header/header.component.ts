import { Event, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  lastUpdated: any;
  logOutHide = true;
  constructor(private datePipe: DatePipe, private authService :AuthService, private router :Router) {
    // console.log(this.authService.componentHide);

    // if(this.authService.componentHide === false && (this.authService.componentHide !== null &&  this.authService.componentHide !== undefined) ){

    //   this.logOutHide = false;
    //   // console.log('Here', this.hide);

    // }

    // if(this.authService.componentHideSubject){
    //   this.logOutHide = false;
    // }
    // this.authService.componentHide.subscribe((res)=>{
    //   console.log(res);
    //   if(res){
    //     this.logOutHide = false;
    //   }
    // })
    const d = this.authService.currentUserValue;
    if(d && !this.router.url.includes('auth') ){
      // console.log('here');
      this.logOutHide = false;

    }

    // if(this.authService.otpResponse === 'Entered OTP is wrong, try again! '){
    //   this.logOutHide = false;
    // }

    this.authService.getLogOutHide().subscribe((res: any)=>{
      // console.log(res);
      if(res){
      this.logOutHide = false;

      }
    })
    // this.router.events.subscribe((r: Event)=>{
    //   if(r instanceof NavigationEnd){
    //     if(!this.router.url.includes('auth')){
    //       console.log(this.authService.componentHideSubject, 'here');
    //       if(this.authService.componentHideSubject){
    //         this.logOutHide = false;
    //       }
    //     }
    //   }
    // })


  }

  ngOnInit(): void {
    this.lastUpdated = this.datePipe.transform(new Date(), 'dd-MMM-yyyy hh:mm:ss')
  }
  logOut(){
    this.authService.logout();
  }

}
