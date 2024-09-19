import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Expense} from "../../model/expense.entity";

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.css'
})
export class ExpenseTableComponent implements AfterViewInit {

  expenses: Expense[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'description', 'company', 'currency'];
  dataSource: MatTableDataSource<Expense>;
  lastId = 0;

  constructor() {
    this.dataSource = new MatTableDataSource(this.expenses);

  }

  expenseCreatedEvent($event: Expense) {
    console.log('Task created');
    this.addNewExpense($event); // Pass $event to addNewItem
    this.dataSource._updateChangeSubscription();

  }

  addNewExpense(newItem: Expense) {
    newItem.id = (++this.lastId).toString(); // Convert the number to a string
    this.expenses.push(newItem);
    this.dataSource.data = this.expenses;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
