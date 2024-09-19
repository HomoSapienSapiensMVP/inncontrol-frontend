import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../../../../shared/model/task/task.entity";
@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrl: './task-edit-dialog.component.css'
})
export class TaskEditDialogComponent {
  TaskItemFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<TaskEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task) {

    this.TaskItemFormGroup = this.formBuilder.group({
      taskName: new FormControl(data.name, [
        Validators.required,
        Validators.minLength(2)
      ]),
      description: new FormControl(data.description, [
        Validators.required,
        Validators.minLength(2)
      ]),
      dueDate: new FormControl(data.dueDate, [
        Validators.required,
      ]),
      dueTime: new FormControl(data.dueDate, [
        Validators.required,
      ]),
      status: new FormControl(data.pending, [
        Validators.required,
        Validators.pattern('pending|completed')
      ]),
      employee: new FormControl(data.employeeEmail, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(2)
      ]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.TaskItemFormGroup.valid) {
      const formValues = this.TaskItemFormGroup.value;

      let part = formValues.dueTime.split(":");
      let hrs = part[0];
      let mins = part[1];

      let date: any = new Date(formValues.dueDate);
      date.setHours(hrs, mins, 0);
      const updatedTask = {
        ...formValues,
        id: this.data.id,
        taskName: formValues.taskName,
        description: formValues.description,
        dueDate: date,
        status: formValues.status,
        employee: formValues.employee
      };

      this.dialogRef.close(updatedTask);
    }
  }
}
