import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private message = '';
  constructor(
      private fb: FormBuilder,
      private readonly authService: AuthService,
      private readonly router: Router,
    ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose( [Validators.email, Validators.required , Validators.maxLength(99)])],
      password: ['', Validators.compose( [Validators.required , Validators.maxLength(50)])]
    });
   }

  login() {
      this.authService.login(this.loginForm.value).subscribe(
        res => {
          if (res) {
            this.router.navigate(['profile']);
          } else {
            this.message = 'Auth error!!!!';
          }

      });
  }
  ngOnInit() {
  }

}
