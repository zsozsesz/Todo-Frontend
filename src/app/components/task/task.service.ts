import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { TaskDto } from 'src/app/common/dto/task.dto';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.baseURL + '/task');
  }

  editTask(taskDto: TaskDto, id: number): Observable<TaskDto> {
    return this.http.put(this.baseURL + '/task/' + id, taskDto);
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseURL + '/task/' + id);
  }
}
