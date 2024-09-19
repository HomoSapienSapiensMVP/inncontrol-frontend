import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-messages-card-dialog',
  templateUrl: './messages-card-dialog.component.html',
  styleUrl: './messages-card-dialog.component.css'
})
export class MessagesCardDialogComponent {

  deleted: string = 'Delete';
  answer: string = 'Answer';

  constructor(public dialogRef: MatDialogRef<MessagesCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('Data recieved: ', data);


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
