import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserApiServiceService } from '../../../../shared/services/user-api.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User} from "../../../../shared/model/user/user";

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css'],
})
export class UserEditDialogComponent {
  editForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserApiServiceService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.fb.group({
      firstName: [data.names, Validators.required],
      lastName: [data.lastName, Validators.required],
      phoneNumber: [data.phoneNumber, Validators.required],
      email: [data.email, [Validators.required, Validators.email]]
    });
  }

  save(): void {
    if (this.editForm.valid) {
      const updatedUser = { ...this.data, ...this.editForm.value };
      // TODO IMPLEMENT TO BACKEND
      // this.userService.updateUser(Number(localStorage.getItem('id')),updatedUser).subscribe(
      //   () => {
      //     this.snackBar.open('User updated successfully', 'Close', {
      //       duration: 2000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'top',
      //       panelClass: ['success-snackbar']
      //     });
      //     this.dialogRef.close(updatedUser);
      //   },
      //   error => {
      //     this.snackBar.open('Failed to update user', 'Close', {
      //       duration: 2000,
      //       horizontalPosition: 'center',
      //       verticalPosition: 'top',
      //       panelClass: ['error-snackbar']
      //     });
      //   }
      // );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
