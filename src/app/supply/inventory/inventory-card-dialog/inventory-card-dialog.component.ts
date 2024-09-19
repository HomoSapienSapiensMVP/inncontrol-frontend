import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../inventory-create/model/inventory.entity";
import {
  InventoryEditDialogComponent
} from "../inventory-create/components/inventory-edit-dialog/inventory-edit-dialog.component";
import {InventoryCardsComponent} from "../inventory-cards/inventory-cards.component";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-inventory-card-dialog',
  templateUrl: './inventory-card-dialog.component.html',
  styleUrl: './inventory-card-dialog.component.css'
})
export class InventoryCardDialogComponent {
  @Output() update = new EventEmitter<Inventory>();
  @Output() delete = new EventEmitter<Inventory>();
  @Output() clicked = new EventEmitter<unknown>();

  constructor(public dialogRef: MatDialogRef<InventoryCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Inventory, private dialog: MatDialog) {

    console.log('Data received: ', data.Quantity);
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

  openUpdateDialog(): void {
    console.log('Inventory card update dialog open');
    }

  protected readonly InventoryCardsComponent = InventoryCardsComponent;
}
