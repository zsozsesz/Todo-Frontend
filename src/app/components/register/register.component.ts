import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private message = '';
  constructor(
      private fb: FormBuilder,
      private readonly authService: AuthService,
      private readonly router: Router,
    ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose( [Validators.required , Validators.maxLength(99)])],
      email: ['', Validators.compose( [Validators.email, Validators.required , Validators.maxLength(99)])],
      password: ['', Validators.compose( [Validators.required , Validators.maxLength(50)])],
      confirmPassword: ['', Validators.compose( [Validators.required , Validators.maxLength(50)])],
      role: ['', Validators.required],
      file: [null],
    });
   }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('file').setValue(file);
    }
  }

  ngOnInit() {
  }
  addUser() {
    if ( this.registerForm.get('password').value !==  this.registerForm.get('confirmPassword').value) {
        this.message = 'passwords should match';
    } else {
      const userForm = new FormData();
      userForm.append('name', this.registerForm.get('name').value);
      userForm.append('email', this.registerForm.get('email').value);
      userForm.append('password', this.registerForm.get('password').value);
      userForm.append('confirmPassword', this.registerForm.get('confirmPassword').value);
      userForm.append('role', this.registerForm.get('role').value);
      userForm.append('file', this.registerForm.get('file').value);
      this.authService.register(userForm).subscribe(
        res => {
          if (res) {
            this.router.navigate(['profile']);
          } else {
            this.message = 'Email already in use!!!!';
          }

      });
    }
  }

}
