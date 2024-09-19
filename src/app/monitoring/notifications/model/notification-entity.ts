export class Notification {

  date: Date;
  message: string;
  viewed: boolean;

  constructor(date: Date, message: string, viewed: boolean = false) {
    this.date = date;
    this.message = message;
    this.viewed = viewed;
  }
}
