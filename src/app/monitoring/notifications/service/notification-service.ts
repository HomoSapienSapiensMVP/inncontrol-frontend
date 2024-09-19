import {Notification} from "../model/notification-entity";
import {ThemePalette} from "@angular/material/core";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: Notification[] = [
    new Notification(new Date(), 'You have a new message', true),
    new Notification(new Date(), 'You have a new message'),
    new Notification(new Date(), 'You have a new message', true),
    new Notification(new Date(), 'You have a new message'),
    new Notification(new Date(), 'You have a new task'),
    new Notification(new Date(), 'You have a new task'),
    new Notification(new Date(), 'You have a new task'),
    new Notification(new Date(), 'You have a new task', true),
  ];

  // This is only for testing purposes it´s supposed to set viewed in backend.
  notificationsViewed() {
    this.notifications.forEach(notification => notification.viewed = true);
  }

  getNotificationsQuantity(): number {
    return this.notifications.length;
  }

  getNiceNotificationsMessage() {
    if (this.hasUnViewedNotifications()) {
      return 'You have ' + this.getUnViewedNotifications() + ' new notifications';
    } else {
      return 'No new notifications';
    }
  }

  getNiceNotificationsQuantity(): string {
    if (this.hasUnViewedNotifications()) {
      return this.getUnViewedNotifications().toString()
    }
    return '';
  }

  getUnViewedNotifications(): number {
    return this.notifications.filter(notification => !notification.viewed).length;
  }

  hasUnViewedNotifications(): boolean {
    return this.getUnViewedNotifications() > 0;
  }

  calculateBadgeColor(): ThemePalette {
    return this.getUnViewedNotifications() > 0 ? 'warn' : 'primary';
  }

}
