export class Message {
  id: number;
  from: number;
  to: number;
  subject: string;
  text: string;
  date: string;
  state: string;
  sender: string;
  receiver: string;

  constructor(id: number, from: number, to: number, subject: string, text: string, date: string, state: string, sender: string, receiver: string) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.date = date;
    this.state = state;
    this.sender = sender;
    this.receiver = receiver;
  }
}
