import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.css'
})
export class EmployeeDialogComponent {


  constructor(public dialogRef: MatDialogRef<EmployeeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('Data recieved: ', data);


  }


onNoClick(): void {
  this.dialogRef.close();
}

}
