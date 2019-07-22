import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/components/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskDto } from 'src/app/common/dto/task.dto';
import * as moment from 'moment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  private taskForm: FormGroup;
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDto
    ) {
    this.taskForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(99)])],
        description: ['', Validators.compose([Validators.required, Validators.maxLength(400)])],
        startDate: ['',  Validators.compose([Validators.required])],
        endDate: ['',  Validators.compose([Validators.required])],
    });
  }


  addTask() {
    const task: TaskDto = {
      name: this.taskForm.get('name').value,
      description: this.taskForm.get('description').value,
      startDate: moment(this.taskForm.get('startDate').value).format('YYYY-MM-DD'),
      endDate: moment(this.taskForm.get('endDate').value).format('YYYY-MM-DD'),
    };
    this.userService.addTask(task).subscribe(res => {
      this.dialogRef.close(res);
    });
  }
  ngOnInit() {
  }

}
