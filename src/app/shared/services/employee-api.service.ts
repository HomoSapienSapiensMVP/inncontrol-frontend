import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {CreateEmployeeRequest} from "../model/employee/create-employee.request";
import {User} from "../model/user/user";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, catchError, Observable, retry, throwError} from "rxjs";
import {EmployeeResponse} from "../model/employee/employee.response";
import {ProfileResponse} from "../model/employee/profile.response";
import {getRoleUserFromValue} from "../../iam/model/roll-user";

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  basePath: string = environment.production ? environment.prodBasePath : environment.serverBasePath;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User // default value
  );

  private employees = new BehaviorSubject<ProfileResponse[]>([]);

  getAllProfiles() {
    this.fetchAllProfiles();
    return this.employees.asObservable();
  }

  getCurrentUsername(): string {
    return this.currentUser.value.email;
  }

  getCurrentUser() {
    return this.currentUser.asObservable();
  }

  constructor(protected httpClient: HttpClient) {
  }

  fetchAllProfiles() {
    this.httpClient.get<ProfileResponse[]>(`${this.basePath}/profiles`)
      .subscribe({
        next: (response) => {
          this.employees.next(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  createEmployee(request: CreateEmployeeRequest, email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient.post<EmployeeResponse>(`${this.basePath}/employees`, request, this.httpOptions)
        .subscribe({
          next: (response) => {
            console.log(`Employee created with id ${response}`);
            resolve(true);
          },
          error: (error) => {
            let errorBody = error.error;
            console.log(errorBody);
            reject(errorBody.message);
          }
        })
    });
  }

  setLocalProfile(email: string) {
    this.fetchUser(email).then((user) => {
      // console.log(`User fetch with id ${user.id}`);
      // console.log(user);
      this.currentUser.next(user);
    });
  }

  fetchFetchProfile(id: number): Promise<ProfileResponse> {
    return new Promise<ProfileResponse>((resolve, reject) => {
      this.httpClient.get<ProfileResponse>(`${this.basePath}/profiles/${id}`)
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error) => {
            let errorBody = error.error;
            reject(errorBody.message);
          }
        })
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from backend
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  fetchUser(email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.httpClient.get<EmployeeResponse>(`${this.basePath}/employees?email=${email}`)
        .subscribe({
          next: (response) => {
            this.fetchFetchProfile(response.profileId).then((profile) => {
              let user = new User();
              user.id = profile.userId;
              user.email = profile.email;
              // console.log(response.role);
              user.rolUser = getRoleUserFromValue(response.role);
              // user.rolUser = response.rolUser;
              user.names = profile.names;
              user.lastName = profile.lastName;
              user.phoneNumber = profile.phoneNumber;
              user.salary = response.salary;
              user.initialDate = response.initiationContract;
              user.finalDate = response.terminationContract
              resolve(user);
            }).catch((error) => {
              // console.log(error);
              reject(error);
            });
          },
          error: (error) => {
            // let errorBody = error.error;
            // console.log(error);
            reject(error);
          }
        })
    });
  }

  getEmployeeById(id: number): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(`${this.basePath}/employees/${id}`);
  }

  getEmployeeProfileById(id: number): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(`${this.basePath}/profiles/${id}`);
  }

}
