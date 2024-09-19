export class Room {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  state: string;
  roomNumber: number;
  initialDate: Date;
  finalDate: Date;

  constructor(id: string, firstName: string, lastName: string, type: string, state: string, roomNumber: number, initialDate: Date, finalDate: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
    this.state = state;
    this.roomNumber = roomNumber;
    this.initialDate = initialDate;
    this.finalDate = finalDate;
  }
}
