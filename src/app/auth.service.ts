import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $role: BehaviorSubject<string> = new BehaviorSubject(null);
  $login: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}


  register(createUserDto: CreateUserDto): Observable<UserDto> {
    return this.http.post<UserDto>('/auth/register', createUserDto);
  }

  login(loginDto: LoginDto): Observable<boolean> {
    return this.http.post<any>('/auth/login', loginDto).pipe(map(
      response => {
        this.$role.next(response.user.role);
        this.$login.next(true);

        localStorage.setItem('access_token', response.access_token);
        return true;
      },
      err => {
        return false;
      }
    ));
  }
}
