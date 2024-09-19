import { Component } from '@angular/core';

@Component({
  selector: 'app-room-update',
  templateUrl: './room-update.component.html',
  styleUrl: './room-update.component.css'
})
export class RoomUpdateComponent {
  selected: string = 'Vacant';

  updateRoom(value: string) {
    this.selected = value;
    console.log('Room updated to: ' + this.selected);


    //Se supone que aquí se haría la llamada al servicio para actualizar la habitación
    //se va a tener que importar el entity de room
    //import { Room } from 'src/app/execution/model/room.entity';
    //y se va a tener que actualizar el status de la habitación
    //room.status = this.selected;
    //y ya con eso se actualiza la habitación
  }
}

