import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private readonly auth: AuthService,  private readonly router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.auth.$login.next(false);
    this.auth.$role.next(null);
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }
}
