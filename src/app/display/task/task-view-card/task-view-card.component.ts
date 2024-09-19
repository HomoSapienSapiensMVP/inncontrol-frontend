import {Component, Inject, Input} from '@angular/core';
import {Task} from "../../../shared/model/task/task.entity";
import {TaskApiService} from "../../../shared/services/task/task-api.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-task-view-card',
  templateUrl: './task-view-card.component.html',
  styleUrl: './task-view-card.component.css'
})
export class TaskViewCardComponent {

  constructor(
    private taskApiService: TaskApiService,
    public dialogRef: MatDialogRef<TaskViewCardComponent>,
    @Inject(MAT_DIALOG_DATA) public task: Task
  ) {
  }

  toggleTaskStatus() {
    this.taskApiService.completeTask(this.task.id).subscribe(() => {
      this.task.pending = !this.task.pending;
      this.dialogRef.close(true);
    });
  }
}
