import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { LoginDto } from './common/dto/login.dto';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $role: BehaviorSubject<string> = new BehaviorSubject(null);
  $login: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private baseURL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}


  register(registerForm: FormData): Observable<boolean> {
    return this.http.post<any>(this.baseURL + '/auth/register', registerForm).pipe(map(
      response => {
        this.$role.next(response.user.role);
        this.$login.next(true);
        localStorage.setItem('access_token', response.access_token);
        return true;
      })
      ,
      catchError((err: any) => {
        return of(false);
      } )
    );
  }

  login(loginDto: LoginDto): Observable<boolean> {
    return this.http.post<any>(this.baseURL + '/auth/login', loginDto).pipe(map(
      response => {
        this.$role.next(response.user.role);
        this.$login.next(true);
        localStorage.setItem('access_token', response.access_token);
        return true;
      }),
      catchError((err: any) => {
        return of(false);
      } )
      );
  }

  getToken() {
     return localStorage.getItem('access_token');
  }
}
