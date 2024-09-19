import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InventoryCardDialogComponent} from "../../../inventory-card-dialog/inventory-card-dialog.component";
import {Inventory} from "../../model/inventory.entity";

@Component({
  selector: 'app-inventory-create-dialog',
  templateUrl: './inventory-create-dialog.component.html',
  styleUrl: './inventory-create-dialog.component.css'
})
export class InventoryCreateDialogComponent {

  InventoryItemFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<InventoryCardDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Inventory,
  ) {
    this.InventoryItemFormGroup = this.formBuilder.group({
      name: new FormControl('',[
        Validators.required
      ]),
      description: new FormControl('',[
        Validators.required
      ]),
      brandName: new FormControl('',[
        Validators.required
      ]),
      quantity: new FormControl('',[
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]),
    });
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  onSubmit(): void{
    console.log(this.InventoryItemFormGroup.value.name);

    const formValues = this.InventoryItemFormGroup.value;

    const selectedData = {
      productTitle: formValues.name,
      productDescription: formValues.description,
      Brand: formValues.brandName,
      Quantity: formValues.quantity,
    } as Inventory;
    if(this.InventoryItemFormGroup.valid){
      this.data = selectedData;
      this.dialogRef.close(this.data);
    }
  }

}
