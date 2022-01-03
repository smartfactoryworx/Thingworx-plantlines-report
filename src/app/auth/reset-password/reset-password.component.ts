import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
// import { ClientService } from '../../client.service';
import { FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResetRequestComponent } from '../reset-request/reset-request.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { AppSettings } from '../../app.settings';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isLoaded = false;
  public resetPasswordForm!: FormGroup;

  submitted = false;
  data: any;
  success: boolean = false;
  successMsg: any;
  errorMsg: any;


  returnUrl: string | undefined;
  loading = false;
  newPassword1!: FormControl;
  newPassword2!: FormControl ;
  public settings: any;
  public token: any;
  public isVerified: any;
  public message: any;
  public newPassword: any;
  public email: any;

  constructor(
    // public appSettings: AppSettings,
    public router: Router,
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public authService: AuthService,
    // public appService: ClientService,
    public snackBar: MatSnackBar
  ) {
    // this.settings = this.appSettings.settings;
    this.route.params.subscribe((params) => {
      this.token = params.token;
      this.email = params.email;
      // console.log(params); //working
      this.authService.resetPasswordVerifyToken(this.email,this.token).subscribe((data: any) => {
        // console.log(data, "RESETPWD");
        this.data= data;
        if (data.isVerified) {
          this.isVerified = true;
          console.log("Recahing is verified", 'RESETPWD')
        } else {
          this.message = 'Sorry, verification code is wrong or expired, contact with administrator and request for resend verification code';
          console.log('Reaching not verfiied', 'RESETPWD')
        }
      }, err => {
        this.isVerified = false;
        this.message = err;
        console.log(err, 'RESETPWD')
      });
    }
    );
    this.resetPasswordForm = this.fb.group({
      newPassword1: [null, Validators.compose([Validators.required , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(9)])],
      newPassword2: [null, Validators.compose([Validators.required , Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(9)])],
    });
   }

  ngOnInit(): void {
  }
  saveNewPassword(newPassword: string) {
    const email =  this.email;
    const token = this.token;
    this.authService.resetpassword(email, token, newPassword).subscribe(data => {
      this.success = true;
      // console.log(data, 'RESETPWD');
      this.snackBar.open('Password successfully changed', '', { duration: 2000 });
      this.successMsg ='Password successfully changed';
      // this.router.navigate(['/']);
    },
    error => {
      this.snackBar.open(null, 'Some issue was faced in changing the password.');
      this.errorMsg= 'Some issue was faced in changing the password.'
    });
  }

}
