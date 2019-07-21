import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './common/guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'profile', component: UserComponent, canActivate: [LoginGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
 /* {
    path: 'task', component: TaskComponent
  },/*/
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', redirectTo: 'user', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
