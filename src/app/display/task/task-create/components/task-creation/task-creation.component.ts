import {Component, Output, EventEmitter} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskCreateDialogComponent} from "../task-create-dialog/task-create-dialog.component";
import {Task} from "../../../../../shared/model/task/task.entity";


@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrl: './task-creation.component.css'
})

export class TaskCreationComponent {

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskCreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskCreated.emit();
      }
    });
  }


}
