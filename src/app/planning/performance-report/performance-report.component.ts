import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../../shared/model/task/task.entity";
import {TaskApiService} from "../../shared/services/task/task-api.service";

@Component({
  selector: 'app-performance-report',
  templateUrl: './performance-report.component.html',
  styleUrl: './performance-report.component.css'
})
export class PerformanceReportComponent implements AfterViewInit {

  tasks: Task[] = [];

  length: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['taskName', 'status', 'userid', 'creationDate'];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>();

  constructor(
    private taskService: TaskApiService,
  ) {
    //this.tasks.push(new Task(1, 'Task 1', 'Description 1', false, new Date(), 'employee@gmail.com'));
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService
      .getAll()
      .pipe()
      .subscribe((response: any) => {
        this.tasks = response;
        console.log(this.tasks);
        this.dataSource = new MatTableDataSource(this.tasks);
      });
  }

  onTaskCreatedEvent($event: Task) {
    console.log('Task created');
    this.length++;
    $event.id = this.length;
    console.log($event);
    this.tasks.push($event);
    this.dataSource._updateChangeSubscription();

  }

  ngAfterViewInit() {
    this.getAllTasks();
    this.dataSource._updateChangeSubscription();
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

