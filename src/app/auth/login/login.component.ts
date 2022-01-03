import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public settings: any;
  public passwordHide = true;

  public otpInputHide = true;
  public disableOnClick = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
  ) {

    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$'),
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  ngOnInit(): void {

  }

  public SendOtp(email: any){
    // console.warn(email);
    this.disableOnClick = true;
    this.authService.getOtp(email.toLowerCase()).subscribe((res: any)=>{
    this.otpInputHide = false;
      this.toastrService.success('An OTP has been sent to entered email,' + 'Pls check your inbox/spam' ,'' ,{
        timeOut: 2000,
      })
    }, err=>{
      this.disableOnClick = false;
      console.log(err);
      this.toastrService.warning(err.error.message ,'' ,{
        timeOut: 2000,
      })
    })

  }

  public verifyLoginOtp(values: any){
    this.authService.verifyLoginOtp(values.email, values.password);

    if(this.authService.otpResponse === 'Entered OTP is wrong, try again! '){
      this.toastrService.warning(this.authService.otpResponse ,'' ,{
        timeOut: 2000,
      })
    }else{
      this.toastrService.success('Welcome to the Dashboard ' + this.authService.otpResponse.toUpperCase(),'' ,{
        timeOut: 1000,
      })

    }


  }

  public onSubmit(values: any): void {
    if (this.loginForm.valid) {
      this.authService.login({username: values.email, password: values.password}).subscribe(res => {
        // console.log(res, "CIAOAMORE")
        this.toastrService.success('Welcome to the Dashboard ' + this.authService.currentUserValue.name.toUpperCase(),'' ,{
          timeOut: 1000,
        })

        if(this.authService.currentUserValue){

          if( (this.authService.currentUserValue.roles.length >0)){

          }else{

            this.toastrService.warning('Currently,You do not have any role assigned, pls contact your administrator & then try logging again   ','' ,{
              timeOut: 10000,
            })
            setTimeout(()=>{
              this.authService.logout()
            },10000)
            // this.authService.logout()
          }
        }
      }, err => {
        console.log(err, "CIAOAMORE")
        // this.toastrService.error('Invalid Login: Please check your email or password','',{
        //   timeOut: 1000,
        // })
        this.toastrService.error(err.error.message,'',{
          timeOut: 3000,
        })
        // console.log(err);
      });
    }
  }

}

@Component({
  selector: 'app-logout',
  template: `
    <div>
      logout
    </div>
  `,
})
export class LogoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
