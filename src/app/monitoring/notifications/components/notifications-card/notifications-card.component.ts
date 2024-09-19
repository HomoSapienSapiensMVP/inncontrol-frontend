import {Component, Input} from '@angular/core';
import {Notification} from "../../model/notification-entity";

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrl: './notifications-card.component.css'
})
export class NotificationsCardComponent {

  @Input() notification: Notification;

  constructor() {
    this.notification = {} as Notification;
  }

}
