import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
})
export class LockScreenComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, public translate: TranslateService) {}

  // when submit button click, router navigates to a home page.
  onSubmit() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }
}
