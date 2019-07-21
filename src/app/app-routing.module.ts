import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'user', component: UserComponent, canActivate: [LoginGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
 /* {
    path: 'task', component: TaskComponent
  },
  {
        path: 'register' component: RegisterComponent
  },*/
  {
    path: '', redirectTo: 'user', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
