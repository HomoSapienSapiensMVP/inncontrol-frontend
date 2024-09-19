import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RoomRequest} from "../../model/room.request";
import {RoomCreateDialogComponent} from "../room-create-dialog/room-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RoomDialogData} from "../../model/room.dialog.data";
import {RoomsApiService} from "../../services/rooms-api.service";

@Component({
  selector: 'app-rooms-card',
  templateUrl: './rooms-card.component.html',
  styleUrl: './rooms-card.component.css'
})
export class RoomsCardComponent {

  @Input() room!: RoomRequest;
  @Output() stateRoomEvent = new EventEmitter();
  @Output() deletedRoomEvent = new EventEmitter();
  Occupied: boolean = false;
  @Output() clicked = new EventEmitter<unknown>();
  Menu: boolean;


  constructor(private dialog: MatDialog,private roomsApiService: RoomsApiService) {
    this.Menu = false;
  }

  ngOnInit() {
    this.Occupied = this.room.roomStatus === 'occupied';
  }

  changeStateRooms() {
    this.Menu = false;
    this.Occupied = false;
    return this.stateRoomEvent.emit(this.room.roomStatus);
  }
  delete() {
    this.roomsApiService.deleteRoom(this.room.id).subscribe(() => {
      this.deletedRoomEvent.emit(this.room.id);
    });
  }

  clickedRoom() {
    if (!this.Menu) {
      console.log('Clicked');
      this.clicked.emit();
    }
  }

  clickedMenu() {
    this.Menu = true;
  }

  getNiceDates(date: string): Date[] {
    const dateStrings = date.split(' - ');
    const dates = dateStrings.map(dateString => new Date(dateString));
    return dates;
  }

  editRoom(room: RoomRequest): void {
    var dates = this.getNiceDates(room.roomReservation);
    const dialogRef = this.dialog.open(RoomCreateDialogComponent, {
      width: '350px',
      data: {
        isUpdate: true,
        id: room.id,
        firstName: room.fullName.split(' ')[0],
        lastName: room.fullName.split(' ')[1],
        type: room.roomType,
        state: room.roomStatus,
        roomNumber: room.roomNumber,
        initialDate: dates[0],
        finalDate: dates[1]
      } as RoomDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.clicked.emit();
    });
  }

}


