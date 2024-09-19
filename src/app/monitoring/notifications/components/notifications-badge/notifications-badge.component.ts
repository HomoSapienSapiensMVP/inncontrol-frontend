import {Component} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";
import {NotificationsViewComponent} from "../notifications-view/notifications-view.component";
import {NotificationService} from "../../service/notification-service";

@Component({
  selector: 'app-notifications-badge',
  templateUrl: './notifications-badge.component.html',
  styleUrl: './notifications-badge.component.css'
})
export class NotificationsBadgeComponent {

  constructor(private dialog: MatDialog, protected notificationsService: NotificationService) {
  }

  onOpenNotifications(): void {
    const dialogRef = this.dialog.open(
      NotificationsViewComponent,
      {
        autoFocus: false
      }
    );
  }
}
