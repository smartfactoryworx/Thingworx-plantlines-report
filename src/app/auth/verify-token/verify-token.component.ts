import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
// import { ClientService,} from '../../client.service';
// import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.scss']
})
export class VerifyTokenComponent implements OnInit {

  isLoaded = false;

  // public settings: any;
  public token: any;
  public isVerified: any;
  public message: any;
  public email: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
  ) {
    this.route.params.subscribe((params) => {
      this.token = params.token;
      this.email = params.email;
      this.authService.verifyToken(this.email,this.token).subscribe((data: any) => {
        if (data.isVerified) {
          this.isVerified = true;
          this.message = 'Congratulation, your email has been verified, now you can login.';
        } else {
          this.isVerified = false;
          this.message = 'Sorry, verification code is wrong or expired, contact with administrator and request for resend verification code';
        }
      }, err => {
        this.message = err;
      });
    });
   }

  ngOnInit(): void {
  }
  goHome(): void {
    this.router.navigate(['/auth/login'])
  }

}
