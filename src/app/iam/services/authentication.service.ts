import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {SignUpResponse} from "../model/sign-up.response";
import {SignUpRequest} from "../model/sign-up.request";
import {SignInResponse} from "../model/sign-in.response";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignInRequest} from "../model/sign-in.request";
import {RoleUser} from "../model/roll-user";
import {EmployeeApiService} from "../../shared/services/employee-api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  basePath: string = environment.production ? environment.prodBasePath : environment.serverBasePath;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUserName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInRole: BehaviorSubject<RoleUser> = new BehaviorSubject<RoleUser>(RoleUser.NONE);

  constructor(private router: Router, private http: HttpClient,
              private employeeService: EmployeeApiService,
              private snackBar: MatSnackBar) {
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUserName() {
    return this.signedInUserName.asObservable();
  }

  get niceUserName(): string {
    return this.signedInUserName.value;
  }

  get currentRole() {
    return this.signedInRole.asObservable();

  }

  signUp(signUpRequest: SignUpRequest): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
        .subscribe({
          next: (response) => {
            console.log(`Signed up as ${response.username} with id ${response.id}`)
            this.showSnackBar(`Signed up as ${response.username}`);
            this.router.navigate(['/login']).then();
            resolve(true);
          },
          error: (error) => {
            let errorBody = error.error;
            this.showSnackBar(`${errorBody.message}`);
            reject(error);
            this.router.navigate(['/register']).then();
          }
        });
      // xd
    });
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  storageSession(response: SignInResponse) {
    localStorage.setItem('token', response.token);
    this.signedIn.next(true);
    this.signedInUserId.next(response.id);
    this.signedInUserName.next(response.username);
    let roleUser = RoleUser.NONE;
    if (response.roles[0] === "EMPLOYEE") {
      roleUser = RoleUser.EMPLOYEE;
    } else if (response.roles[0] === "MANAGER") {
      roleUser = RoleUser.MANAGER;
    }
    this.signedInRole.next(roleUser);

  }

  signIn(signInRequest: SignInRequest): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log(signInRequest);
      this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
        .subscribe({
          next: (response) => {
            this.storageSession(response);
            // console.log(`Signed in as ${response.username} with token ${response.token}`);
            this.showSnackBar(`Signed in as ${response.username}`);
            resolve(true);
            this.router.navigate(['/']).then();
          },
          error: (error) => {
            console.error(`Error while signing in: ${error}`);
            this.signedIn.next(false);
            this.signedInUserId.next(0);
            this.signedInUserName.next('');
            localStorage.removeItem('token');
            this.showSnackBar(`Check your credentials`);
            reject(false);
            this.router.navigate(['/register']).then();
          }
        });
    });
  }


  async verifyToken(): Promise<boolean> {
    // return promise true if token is valid or false is token isn't valid
    const token = localStorage.getItem('token');
    return new Promise((resolve, reject) => {
      if (!token) {
        resolve(false);
      } else {
        this.http.post<SignInResponse>(`${this.basePath}/authentication/verify-token/${token}`, null, this.httpOptions)
          .subscribe({
            next: (response) => {
              this.storageSession(response);
              // console.log(`Retrieved session as ${response.username}`);
              this.showSnackBar(`Retrieved session as ${response.username}`);
              this.employeeService.setLocalProfile(response.username);
              resolve(true);
            },
            error: (error) => {
              // console.error(`Error retrieving session: ${error}`);
              this.signOut();
              resolve(false);
            }
          });
      }
    });
  }

  hasCredentials() {
    return localStorage.getItem('token') !== null;
  }

  // async void retrieve session() {
  async retrieveSession(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.hasCredentials()) {
        this.verifyToken().then((result) => {
          resolve(result);
        });
      } else {
        resolve(false);
      }
    });
  }

  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUserName.next('');
    this.signedInRole.next(RoleUser.NONE);
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then();
  }
}
