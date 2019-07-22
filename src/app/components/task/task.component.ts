import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { TaskDto } from 'src/app/common/dto/task.dto';
import { BehaviorSubject } from 'rxjs';
import { CreateTaskComponent } from 'src/app/modals/create-task/create-task.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  $hidden: BehaviorSubject<boolean>  = new BehaviorSubject(true);
  private tasks: TaskDto[] = [];
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'action'];
  constructor(private readonly taskService: TaskService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(res => {
      this.tasks = res;
      this.$hidden.next(false);
  });
  }
  editTask(task) {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '50%',
      data: task,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTasks();
      }
    });
  }


  delete(id: number) {
    const result = confirm('Are your sure?');
    if (result) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.getTasks();
      });
    }

  }
}
