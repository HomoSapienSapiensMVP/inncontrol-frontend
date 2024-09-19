import {Component} from '@angular/core';
import {NotificationService} from "../../service/notification-service";

@Component({
  selector: 'app-notifications-view',
  templateUrl: './notifications-view.component.html',
  styleUrl: './notifications-view.component.css'
})
export class NotificationsViewComponent {

  constructor(protected notificationService: NotificationService) {
  }
}
