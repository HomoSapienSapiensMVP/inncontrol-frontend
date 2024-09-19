import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EventEmitter, Output} from '@angular/core';
import {Expense} from "../../model/expense.entity";
import {ExpenseAddDialogComponent} from "../expense-add-dialog/expense-add-dialog.component";

@Component({
  selector: 'app-expense-add-button',
  templateUrl: 'expense-add-button.component.html',
  styleUrl: 'expense-add-button.component.css'


})

export class ExpenseAddButtonComponent {
  @Output() expenseCreated = new EventEmitter<Expense>();
  selectedItem: Expense | null = null;

  constructor(private dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ExpenseAddDialogComponent, {
      data: new Expense('', '', '', 2 , "")
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedItem = result;
        // @ts-ignore
        this.itemCreated.emit(this.selectedItem);
      }
    });
  }
}
