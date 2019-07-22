import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserDto } from 'src/app/common/dto/user.dto';
import { TaskDto } from 'src/app/common/dto/task.dto';
import { MatDialog } from '@angular/material';
import { TaskListComponent } from 'src/app/modals/task-list/task-list.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'avatar', 'role', 'action'];
  users: UserDto[] = [];
  constructor(private readonly userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUser().subscribe( res => {
      this.users = res;
    });
  }
  assign(id: number, tasks: TaskDto[]) {
    this.userService.getAssignableTasks(id).subscribe(res => {
    const dialogRef = this.dialog.open(TaskListComponent, {
        width: '70%',
        data: {
          userId: id,
          tasks,
          assingable: res,
        },
      });
    dialogRef.afterClosed().subscribe(result => {
         this.getUsers();
        });
    });
  }
}
