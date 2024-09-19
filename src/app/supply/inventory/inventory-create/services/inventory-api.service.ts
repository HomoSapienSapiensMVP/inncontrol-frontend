import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Inventory } from '../model/inventory.entity';
import { BaseService } from '../../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryApiService extends BaseService<Inventory> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/inventory';
  }
}
