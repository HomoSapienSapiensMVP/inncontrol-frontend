import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-messages-card',
  templateUrl: './messages-card.component.html',
  styleUrl: './messages-card.component.css'
})
export class MessagesCardComponent implements OnInit{
  @Input() message: any;
  @Output() state = new EventEmitter();
  @Output() deleted = new EventEmitter();
  unread: boolean = false;
  @Output() clicked = new EventEmitter<unknown>();
  Menu: boolean;


constructor() {
  this.Menu = false;
}



  ngOnInit() {

  if (this.message.state === 'unread') {
    this.unread = true;
  }else {
    this.unread = false;
  }


 }



  changeState() {

  this.Menu = false;
  this.unread = false;
  return this.state.emit(this.message.id);

  }

  delete() {
    this.Menu = false;

    return this.deleted.emit(this.message.id);
  }

  clickedMessage() {
  if (!this.Menu) {
    console.log('Clicked');
  this.clicked.emit();
  }
}

  clickedMenu() {
    this.Menu = true;
  }

}
