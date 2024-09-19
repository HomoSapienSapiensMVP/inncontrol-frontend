import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../base.service';
import {Task} from "../../model/task/task.entity";
import {environment} from "../../../../environments/environment";
import {catchError, Observable, retry} from "rxjs";
import {EmployeeApiService} from "../employee-api.service";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService extends BaseService<Task> {

  manager: boolean = false;
  employeeEmail: string = 'n/a';

  constructor(http: HttpClient, private employeeService: EmployeeApiService) {
    super(http);
    this.resourceEndpoint = '/tasks';
    this.employeeService.getCurrentUser().subscribe((user) => {
      this.manager = user.rolUser == 1;
      this.employeeEmail = user.email;
    });
  }

  getMyTasks() {
    if (this.employeeEmail == undefined) {
      return new Observable<Task[]>();
    }
    return this.getAllTaskForEmployee(this.employeeEmail);
  }

  createTask(request: any) {
    return this.http.post(this.resourcePath(), JSON.stringify(request), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  override getAll(): Observable<Task[]> {
    if (this.employeeEmail == undefined) {
      return new Observable<Task[]>();
    }
    return this.manager ? this.getAllTasks() : this.getAllTaskForEmployee(this.employeeEmail);
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${this.resourcePath()}`).pipe(retry(2), catchError(this.handleError));
  }

  getAllTaskForEmployee(employeeEmail: string) {
    return this.http.get<Task[]>(`${this.resourcePath()}/employee/${employeeEmail}`).pipe(retry(2), catchError(this.handleError));
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.resourcePath()}/${id}`).pipe(retry(2), catchError(this.handleError));
  }

  completeTask(id: number) {
    return this.http.post(`${this.resourcePath()}/${id}/complete`, {}).pipe(retry(2), catchError(this.handleError));
  }
}
