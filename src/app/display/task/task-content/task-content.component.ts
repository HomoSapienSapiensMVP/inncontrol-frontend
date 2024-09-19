import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TaskApiService} from "../../../shared/services/task/task-api.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskEditDialogComponent} from "../task-create/components/task-edit-dialog/task-edit-dialog.component";
import {Task} from "../../../shared/model/task/task.entity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeApiService} from "../../../shared/services/employee-api.service";

@Component({
  selector: 'app-task-content',
  templateUrl: './task-content.component.html',
  styleUrl: './task-content.component.css'
})
export class TaskContentComponent implements OnInit, AfterViewInit {
  tasksData: Task[] = [];
  filteredTasks: Task[] = [];

  filterType: 'name' | 'description' | 'dueDate' | 'pending' | 'employeeEmail' = 'name';
  defaultFilterType: 'name' | 'description' | 'dueDate' | 'pending' | 'employeeEmail' = 'name';

  isManager: boolean = false;


  constructor(private taskService: TaskApiService, private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userApiService: EmployeeApiService
  ) {
    userApiService.getCurrentUser().subscribe((user) => {
      this.getAllTasks();
      this.isManager = user.rolUser == 1;
    });
  }

  ngAfterViewInit(): void {
    this.getAllTasks();
  }

  private getAllTasks(): void {
    this.taskService.getAll().pipe().subscribe((response: any) => {
      this.tasksData = response;
      this.filteredTasks = this.tasksData;
    })
  }

  protected createTask(_: any) {
    this.getAllTasks();
  };

  handleUpdate(task: Task): void {
    this.openUpdateDialog(task);
  }

  onDeleteItem(element: Task) {
    this.deleteTask(element.id);
  }


  private deleteTask(taskId: number): void {
    this.taskService.delete(taskId).subscribe(() => {
      this.getAllTasks();
      this.tasksData = this.tasksData.filter((task: Task) => task.id !== taskId);
    });
  }

  openUpdateDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTask(result);
      }
    });
  }

  private updateTask(task: Task): void {
    this.taskService.update(task.id, task).subscribe((response: Task) => {
      const index = this.tasksData.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasksData[index] = response;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.filteredTasks = this.tasksData.filter(task => {
        let value = task[this.filterType];
        if (value) {
          if (value instanceof Date) {
            value = value.toISOString();
          }
          if (typeof value === 'boolean') {
            return value.toString().includes(filterValue);
          }
          return value.toLowerCase().includes(filterValue);
        }
        return false;
      });
    } else {
      this.filteredTasks = this.tasksData;
    }
  }

  resetFilter(filterInput: HTMLInputElement): void {
    filterInput.value = '';
    this.filterType = this.defaultFilterType;
    this.filteredTasks = this.tasksData;
  }

  ngOnInit() {
    this.getAllTasks();
  }

}
