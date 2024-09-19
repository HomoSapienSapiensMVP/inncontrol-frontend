import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";
import {EmployeeApiService} from "../../../../shared/services/employee-api.service";
import {ProfileResponse} from "../../../../shared/model/employee/profile.response";

@Component({
  selector: 'app-employees-container',
  templateUrl: './employees-container.component.html',
  styleUrls: ['./employees-container.component.css']
})
export class EmployeesContainerComponent implements OnInit {
  ResetEmployees: ProfileResponse[] = [];
  EmployeesArray: ProfileResponse[] = [];
  options: { title: string }[] = [
    {title: 'Role'},
    {title: 'Service Hours'},
    {title: 'Reset'}
  ];

  constructor(private employeeApiService: EmployeeApiService, private dialog: MatDialog) {
  }

  getEmployees() {
    this.employeeApiService.getAllProfiles().subscribe((employees) => {
        this.EmployeesArray = employees;
        this.ResetEmployees = employees;
        // console.log('Employees:', this.EmployeesArray);
      },
      (error: any) => {
        console.log('Error getting employees');
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.getEmployees();
  }

  receiveFilter(event: any) {
    console.log('Event received from child:', event);
    if (event === 'Role') {
    } else if (event === 'Service Hours') {
    } else if (event === 'Reset') {
      this.EmployeesArray = [...this.ResetEmployees];
    }
  }

  openDialog(employee: ProfileResponse): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  updateEmployee($event: any) {
    // Logic for updating employee
  }

  deleteEmployee($event: any) {
    // Logic for deleting employee
  }

  searchFilter(event: any) {
    console.log('Search event received from child:', event);
  }
}
