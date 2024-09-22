import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../../shared/model/task/task.entity";
import {EmployeeApiService} from "../../../../shared/services/employee-api.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskViewCardComponent} from "../../task-view-card/task-view-card.component";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() update = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();

  manager: boolean = false;

  constructor(
    private employeeService: EmployeeApiService,
    private dialog: MatDialog
  ) {
    this.employeeService.getCurrentUser().subscribe((user) => {
      this.manager = user.rolUser == 1;
    });
  }

  openDialogToComplete(): void {
    const dialogRef = this.dialog.open(TaskViewCardComponent, {
      data: this.task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.task.pending = !this.task.pending;
    }});
  }

  deleteTask(): void {
    this.delete.emit(this.task);
  }
  openUpdateDialog(): void {
    this.update.emit(this.task);
  }
}
