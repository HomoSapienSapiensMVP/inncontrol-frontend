export class RoomRequest {
  id: number;
  fullName: string;
  roomType: string;
  roomStatus: string;
  roomNumber: number;
  roomReservation: string;

  constructor(id: number, fullName: string, roomType: string, roomStatus: string, roomNumber: number, roomReservation: string) {
    this.id = id;
    this.fullName = fullName;
    this.roomType = roomType;
    this.roomStatus = roomStatus;
    this.roomNumber = roomNumber;
    this.roomReservation = roomReservation;
  }
}
