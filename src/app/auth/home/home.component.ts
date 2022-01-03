import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    // console.log(this.router.url, 'poioiuu')
    this.currentUser = this.authService.currentUserValue;
    if (!this.currentUser) {
      this.router.navigate(['/auth/un-authorized']);
    } else {
      this.router.navigate(['/reports']);

      // this.router.navigate(['/pda/in/gj/osd1/h02']);
      // if (this.currentUser.auth.isSuper) {
      //   if (this.currentUser.settings.homeRoute === '/') {
      //     this.router.navigate(['/reports']);
      //   } else {
      //     this.router.navigate([ this.currentUser.settings.homeRoute]);
      //   }
      // } else {
      //   this.router.navigate([ this.currentUser.settings.homeRoute]);
      // }
    }
  }

}
