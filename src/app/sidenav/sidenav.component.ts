import { Router, NavigationEnd, NavigationStart, Event } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  hide = true;
  constructor(private authService: AuthService, private router:Router) {
    // this.authService.componentHide.subscribe((res)=>{
    //   console.log(res);
    //   if(res){
    //     this.hide = false;
    //   }
    // })
    const checkCurrentUser = this.authService.currentUserValue;
    if(checkCurrentUser && !this.router.url.includes('auth') ){
      console.log('here');
      this.hide = false;

    }

    this.authService.getComponentHide().subscribe((res: any)=>{
      console.log(res);

      if(res){
      this.hide = false;

      }
    })
    // if(d && !this.router.url.includes('auth') ){
    //   console.log('here');
    //   this.hide = false;
// this.authService.componentHide.subscribe((r)=>{
//   if(r){
//   this.hide = false;

//   }
// })
    // }
    // this.router.events.subscribe((r: Event)=>{
    //   if(r instanceof NavigationEnd){
    //     if(!this.router.url.includes('auth')){
    //       if(this.authService.componentHideSubject){
    //         this.hide = false;
    //         console.log(this.hide, this.authService.componentHideSubject);
    //       }
    //     }
    //   }
    // })

    // this.router.events.subscribe((r: Event)=>{
    //   if(r instanceof NavigationEnd){
    // const d = this.authService.currentUserValue;

    //     if(d && !this.router.url.includes('auth')){
    //       this.hide = false;
    //       console.log(this.hide);
    //     }
    //   }
    // })


  }
  @ViewChild('sidenav') sidenav: MatSidenav;

  isExpanded = true;
  showMastersSubmenu: boolean = true;
  showReportsSubmenu: boolean = true;
  showManualEntrySubmenu: boolean = true;
  isShowing = false;

  // showSubSubMenu: boolean = false;
}
