import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
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
  addTask(taskDto: TaskDto): Observable<UserDto> {
    return this.http.post(this.baseURL + '/user/create', taskDto);
  }
  getAllUser(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.baseURL + '/user');
  }
  getAssignableTasks(id: number): Observable<TaskDto[]> {
    return this.http.get<UserDto[]>(this.baseURL + '/user/assignable/ ' + id);
  }
  unAssign(userId: number, taskId: number) {
    return this.http.post(this.baseURL + '/user/unassign', {userId, taskId});
  }
  getUser(id: number): Observable<UserDto>{
    return this.http.get<UserDto>(this.baseURL + '/user/' + id);
  }
}
