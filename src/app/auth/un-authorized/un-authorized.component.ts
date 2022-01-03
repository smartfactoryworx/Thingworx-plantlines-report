import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-un-authorized',
  templateUrl: './un-authorized.component.html',
  styleUrls: ['./un-authorized.component.scss']
})
export class UnAuthorizedComponent implements OnInit {

  public unAuthorizedUrl: any;
  public isVerified: any;
  public message: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.unAuthorizedUrl = '/pda/' + this.route.snapshot.queryParams['returnUrl'];
  }
  goHome(): void {
    // this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
