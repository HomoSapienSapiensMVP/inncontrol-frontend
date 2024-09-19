import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Inventory} from "../inventory-create/model/inventory.entity"

@Component({
  selector: 'app-inventory-card',
  templateUrl: './inventory-cards.component.html',
  styleUrl: './inventory-cards.component.css'
})
export class InventoryCardsComponent {
  @Input() inventory!: Inventory;
  @Output() update = new EventEmitter<Inventory>();
  @Output() delete = new EventEmitter<Inventory>();
  @Output() clicked = new EventEmitter<unknown>();

  Menu: boolean;
  constructor() {
    this.Menu = false;
  }
  clickedMenu(){
    this.Menu = true;
  }
  openDeleteDialog(){
    this.delete.emit(this.inventory);
  }
  openUpdateDialog(): void {
    this.update.emit(this.inventory);
  }
  clickedInventory(){
    if(!this.Menu){
      console.log('Inventory dialog card opened');
      console.log(this.inventory + "Inventory card component");
      this.clicked.emit();
    }

  }
}
