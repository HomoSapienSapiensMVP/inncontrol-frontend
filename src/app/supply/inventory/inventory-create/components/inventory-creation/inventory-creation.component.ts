import {Component, EventEmitter, Output} from '@angular/core';
import {Inventory} from "../../model/inventory.entity";
import {MatDialog} from "@angular/material/dialog";
import {InventoryCreateDialogComponent} from "../inventory-create-dialog/inventory-create-dialog.component";


@Component({
  selector: 'app-inventory-creation',
  templateUrl: './inventory-creation.component.html',
  styleUrl: './inventory-creation.component.css'
})
export class InventoryCreationComponent {
  @Output() itemCreated = new EventEmitter<Inventory>();
  selectedItem: Inventory | null = null;

  constructor(private dialog: MatDialog) {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(InventoryCreateDialogComponent,{
      data: new Inventory(0,'','','',0)
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        console.log(result);
        this.selectedItem = result;
        // @ts-ignore
        this.itemCreated.emit(this.selectedItem);
      }
    });
  }
}
