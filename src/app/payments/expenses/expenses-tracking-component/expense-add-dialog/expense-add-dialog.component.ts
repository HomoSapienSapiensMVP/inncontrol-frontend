
import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Expense} from "../../model/expense.entity";

@Component({
  selector: 'app-expense-add-dialog',
  templateUrl: './expense-add-dialog.component.html',
  styleUrl: './expense-add-dialog.component.css'
})
export class ExpenseAddDialogComponent {
  reportExpenseFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<ExpenseAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Expense,
  ) {
    this.reportExpenseFormGroup = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2)  // minimum 2 characters
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      quantity: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.pattern("^[0-9]*$")  //numeric input
      ])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.reportExpenseFormGroup.valid) {
      this.data = this.reportExpenseFormGroup.value;
      this.dialogRef.close(this.data);
    }
  }
}
