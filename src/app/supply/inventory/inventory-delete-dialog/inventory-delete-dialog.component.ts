import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {InventoryApiService} from "../inventory-create/services/inventory-api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Inventory} from "../inventory-create/model/inventory.entity";

@Component({
  selector: 'app-inventory-delete-dialog',
  templateUrl: './inventory-delete-dialog.component.html',
  styleUrl: './inventory-delete-dialog.component.css'
})
export class InventoryDeleteDialogComponent {
  inventoryData: Inventory[] = [];
  item: Inventory;
  InventoryDeleteFormGroup: FormGroup;

  constructor(private inventoryService: InventoryApiService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<InventoryDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Inventory) {
    this.item = new Inventory(0, '', '', '', 0);
    this.InventoryDeleteFormGroup = this.formBuilder.group({
      id: new FormControl(data.id, [
        Validators.required
      ])
    });
  }

  borrarItem(): void {
    this.deleteItem(this.data.id)
    console.log('Item deleted');
    this.onNoClick();
  }

  private deleteItem(inventoryId: number) {
    this.inventoryService.delete(inventoryId).subscribe(() => {
      this.inventoryData = this.inventoryData.filter((inventory: Inventory) => inventory.id !== inventoryId);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
