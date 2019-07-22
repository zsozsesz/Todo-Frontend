import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './common/guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskComponent } from './components/task/task.component';
import { AdminGuard } from './common/guards/admin.guard';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'profile', component: UserComponent, canActivate: [LoginGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'tasks', component: TaskComponent , canActivate: [AdminGuard]
  },
  {
    path: 'users', component: UserListComponent , canActivate: [AdminGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', redirectTo: 'profile', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
