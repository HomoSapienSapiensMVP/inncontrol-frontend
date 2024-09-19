// src/app/display/room/model/room.create.request.ts

export class RoomCreateRequest {
  firstName: string;
  lastName: string;
  type: string;
  state: string;
  roomNumber: number;
  initialDate: Date;
  finalDate: Date;

  constructor(firstName: string, lastName: string, type: string, state: string, roomNumber: number, initialDate: Date, finalDate: Date) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
    this.state = state;
    this.roomNumber = roomNumber;
    this.initialDate = initialDate;
    this.finalDate = finalDate;
  }
}
