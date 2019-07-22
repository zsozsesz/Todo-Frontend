import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { UserDto } from 'src/app/common/dto/user.dto';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CreateTaskComponent } from 'src/app/modals/create-task/create-task.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  $hidden: BehaviorSubject<boolean>  = new BehaviorSubject(true);
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate'];
  user: UserDto;
  constructor(private readonly userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
   this.userService.getUserData().subscribe( (user: UserDto) => {
        this.$hidden.next(false);
        this.user = user;
    });
  }
  addTask() {
    const dialogRef = this.dialog.open(CreateTaskComponent, {
      width: '50%',
      data: null,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }
}
