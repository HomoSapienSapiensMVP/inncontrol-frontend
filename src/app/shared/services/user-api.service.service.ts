import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {User} from "../model/user/user";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApiServiceService extends BaseService<User>{
  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/users';
  }
}
