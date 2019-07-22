import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/common/dto/user.dto';
import { TaskDto } from 'src/app/common/dto/task.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<UserDto> {
    return this.http.get(this.baseURL + '/user/profile');
  }

  addTask(taskDto: TaskDto): Observable<any> {
    return this.http.post(this.baseURL + '/user/create', taskDto);
  }
}
