import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-messages-new-message-dialog',
  templateUrl: './messages-new-message-dialog.component.html',
  styleUrl: './messages-new-message-dialog.component.css'
})
export class MessagesNewMessageDialogComponent implements OnInit{
  controller = new FormControl();
  myControl = new FormControl<string | { id: number; name: string; }>('');
  answer: any;
  sender: string = '';

  usersNames: { id: number; name: string; }[] = [] as any;
    filteredOptions: Observable<{ id: number; name: string; }[]> = new Observable<{ id: number; name: string; }[]>();
  text: any;
  receiver: any;
  subject: any;



  constructor(public dialogRef: MatDialogRef<MessagesNewMessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
            console.log('Data recieved: ', data);
            console.log('Users Names:', this.usersNames);
    data.users.forEach((name: any) => {
      this.usersNames.push({id: name.id, name: name.concatName()});
    });

    this.answer = data;
    console.log('Answer:', this.answer);
  }

  ngOnInit() {

    this.usersNames.forEach((name) => {
      if (name.id == 1) {
        this.sender = name.name;
      }
      console.log('sender:', this.sender);


    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.usersNames.slice();
      }),
    );
  }

  displayFn(user: {id: number, name: string}): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string):  {id: number, name: string}[] {
    const filterValue = name.toLowerCase();

    return this.usersNames.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
  }

  Send() {
    this.answer.messages.subject = this.subject;
    this.answer.messages.text = this.text;
    this.answer.messages.sender = this.sender;
    this.answer.messages.receiver = this.receiver.name;
    this.answer.messages.date = new Date().toString();
    this.answer.messages.state = 'unread';
    this.answer.messages.from = 1;
    this.answer.messages.to = Number(this.receiver.id);

    console.log('Send 1:', this.answer.messages);

    return this.dialogRef.close(this.answer.messages);

  }
}
