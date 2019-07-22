import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/components/user/user.service';
import { TaskService } from 'src/app/components/task/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskDto } from 'src/app/common/dto/task.dto';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'action'];
  assingableTasks: TaskDto[] = [];
  userTasks: TaskDto[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
    public dialogRef: MatDialogRef<TaskListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.userTasks = this.data.tasks;
      this.assingableTasks = this.data.assingable;
    }

  ngOnInit() {
  }

  unassign(taskId: number) {
    this.userService.unAssign(this.data.userId, taskId).subscribe(() => {
        this.userTasks = this.userTasks.filter(task => {
            return task.id !== taskId;
        });
        this.userService.getAssignableTasks(this.data.userId).subscribe(res => {
          this.assingableTasks = res;
        });
      });
  }
  assign(taskId: number) {
    this.taskService.assignUser(taskId, this.data.userId).subscribe(() => {
      this.userService.getAssignableTasks(this.data.userId).subscribe(res => {
        this.assingableTasks = res;
      });
      this.userService.getUser(this.data.userId).subscribe((res) => {
        this.userTasks = res.tasks;
      });
    });
  }
}
