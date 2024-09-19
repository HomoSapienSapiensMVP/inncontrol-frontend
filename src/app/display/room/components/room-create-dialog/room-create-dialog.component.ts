import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomRequest} from "../../model/room.request";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {RoomsApiService} from "../../services/rooms-api.service";
import {catchError} from "rxjs/operators";
import {of} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoomDialogData} from '../../model/room.dialog.data';
import {RoomCreateRequest} from "../../model/room.create-request";
import {RoomUpdateRequest} from "../../model/room.update-request";

export const dateValidator: ValidatorFn = (control: AbstractControl) => {
  const initialDate = control.get('initialDate');
  const finalDate = control.get('finalDate');
  return initialDate && finalDate && initialDate.value > finalDate.value ? { 'dateInvalid': true } : null;
};

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-create-dialog.component.html',
  styleUrls: ['./room-create-dialog.component.css']
})
export class RoomCreateDialogComponent implements OnInit {

  typeOptions = ['STANDARD', 'SUITE', 'DELUXE_SUITE'];
  stateOptions = ['OCCUPIED', 'VACANT', 'IN_SERVICE'];
  taskForm: FormGroup;
  roomNumberExists: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RoomCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RoomDialogData, private roomsApiService: RoomsApiService, private snackBar: MatSnackBar
  ) {
    this.taskForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      type: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required
      ]),
      roomNumber: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]*$')
      ]),
      initialDate: new FormControl('', [
        Validators.required
      ]),
      finalDate: new FormControl('', [
        Validators.required
      ]),
    },{ validators: dateValidator });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.taskForm.get('roomNumber')?.valueChanges.subscribe(roomNumber => {
      this.checkRoomNumberExists(roomNumber);
    });
    if (this.data.isUpdate) {
      this.setUpdateValues();
    }
  }
  onSubmit(): void {
    if (this.taskForm.hasError('dateInvalid')) {
      this.snackBar.open('The initial date cannot be later than the final date', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
      });
      return;
    }

    if (this.data.isUpdate) {
      this.updateRoom();
    } else {
      this.createRoom();
    }
  }

  setUpdateValues(): void {
    this.taskForm.setValue({
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      type: this.data.type.toUpperCase(),
      state: this.data.state.toUpperCase(),
      roomNumber: this.data.roomNumber,
      initialDate: this.data.initialDate,
      finalDate: this.data.finalDate
    });
  }

  checkRoomNumberExists(roomNumber: number): void {
    this.roomsApiService.getAll().subscribe(existingRooms => {
      this.roomNumberExists = existingRooms.some((room: RoomRequest) => room.roomNumber === roomNumber && room.id !== this.data.id);
    });
  }

  createRoom(): void {
    const formValues = this.taskForm.value;
    const newRoom = new RoomCreateRequest(
      formValues.firstName,
      formValues.lastName,
      formValues.type,
      formValues.state,
      formValues.roomNumber,
      formValues.initialDate,
      formValues.finalDate
    );

    this.roomsApiService.createRoom(newRoom).pipe(
      catchError((error) => {
        this.snackBar.open('An error occurred while creating the room', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return of(null); // Return an Observable that completes without emitting any items
      })
    ).subscribe(response => {
      if (response) {
        console.log(response);
        this.dialogRef.close(response);
        this.snackBar.open('Room created successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }
  updateRoom(): void {
    const formValues = this.taskForm.value;
    const updatedRoom = new RoomUpdateRequest(
      this.data.id,
      formValues.firstName,
      formValues.lastName,
      formValues.type,
      formValues.state,
      formValues.roomNumber,
      formValues.initialDate,
      formValues.finalDate
    );

    this.roomsApiService.updateRoom(updatedRoom).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        this.snackBar.open('An error occurred while updating the room', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        return of(null); // Return an Observable that completes without emitting any items
      })
    ).subscribe(response => {
      if (response) {
        console.log(response);
        this.dialogRef.close(response);
        this.snackBar.open('Room updated successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    });
  }
}
