import {Component, OnInit} from '@angular/core';
import {RoomRequest} from "../../model/room.request";
import {RoomsApiService} from "../../services/rooms-api.service";
import {catchError, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoomCreateRequest} from "../../model/room.create-request";

@Component({
  selector: 'app-room-card-content',
  templateUrl: './room-card-content.component.html',
  styleUrl: './room-card-content.component.css'
})
export class RoomCardContentComponent implements  OnInit{
  ngOnInit(): void {
    this.fetchRooms();
  }

  existingRooms: RoomRequest[] = [];
  newRoom: RoomRequest[] = [];
  roomsData: RoomRequest[] = [];
  length: number = 1;

  constructor(private roomsApiService: RoomsApiService, private snackBar: MatSnackBar) {
  }

  createRoom($event: RoomRequest) {
    this.fetchRooms();
  }

  fetchRooms() {
    console.log('Fetching rooms');
    this.roomsApiService.getAll().subscribe(response => {
      this.roomsData = response.map((room: any) => new RoomRequest(
        room.id,
        room.fullName,
        room.roomType,
        room.roomStatus,
        room.roomNumber,
        room.roomReservation
      ));
    });
  }
  onDeleteRoomEvent(id: number) {
    this.fetchRooms();
  }
}
