export class Expense {

  id: string;
  name: string;
  description: string;
  currency: number;
  date: string;

  constructor(id: string, name: string, description: string, currency: number, date: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.currency = currency;
    this.date = date;
  }
}
