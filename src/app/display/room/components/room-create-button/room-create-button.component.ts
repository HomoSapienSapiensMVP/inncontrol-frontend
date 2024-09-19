import {Component, EventEmitter, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RoomCreateDialogComponent} from "../room-create-dialog/room-create-dialog.component";
import {RoomRequest} from "../../model/room.request";

@Component({
  selector: 'app-room-create-button',
  templateUrl: './room-create-button.component.html',
  styleUrl: './room-create-button.component.css'
})
export class RoomCreateButtonComponent {

  @Output() roomCreated = new EventEmitter<RoomRequest>();

  selectedItem: RoomRequest | null = null;

  constructor(private dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoomCreateDialogComponent, {
      data: new RoomRequest(1, '', '', 'pending', 1, '')
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.selectedItem = result;
        // @ts-ignore
        this.roomCreated.emit(this.selectedItem);
      }
    });
  }
}
