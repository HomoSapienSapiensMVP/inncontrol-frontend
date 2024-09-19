import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {HttpClient} from "@angular/common/http";
import {Room} from "../model/room.entity";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {RoomUpdateRequest} from "../model/room.update-request";
import {RoomCreateRequest} from "../model/room.create-request";

@Injectable({
  providedIn: 'root'
})
export class RoomsApiService extends BaseService<Room>{

  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.resourceEndpoint = '/rooms';
  }

  createRoom(room: RoomCreateRequest): Observable<any> {
    return this.httpClient.post(`${this.resourcePath()}`, room);
  }

  updateRoom(room: RoomUpdateRequest): Observable<any> {
    return this.httpClient.put(`${this.resourcePath()}/${room.id}`, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.httpClient.delete(`${this.resourcePath()}/${id}`, {responseType: 'text'});
  }
}
