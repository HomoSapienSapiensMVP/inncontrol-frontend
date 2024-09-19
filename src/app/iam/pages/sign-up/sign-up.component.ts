import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserApiServiceService} from "../../../shared/services/user-api.service.service";
import {RoleUser} from "../../model/roll-user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SignUpRequest} from "../../model/sign-up.request";
import {AuthenticationService} from "../../services/authentication.service";
import {CreateEmployeeRequest} from "../../../shared/model/employee/create-employee.request";
import {ContractInformationResource} from "../../../shared/model/employee/contract-information.resource";
import {EmployeeApiService} from "../../../shared/services/employee-api.service";
import {SignInRequest} from "../../model/sign-in.request";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  rolUser: RoleUser;

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required)
  });

  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;

  constructor( private snackBar: MatSnackBar,
              private router: Router,
              private authenticationService: AuthenticationService,
              private employeeApi: EmployeeApiService
  ) {
    this.rolUser = RoleUser.EMPLOYEE;
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.password = '';
  }

  signUpAccount() {
    if (this.myForm.valid) {
      console.log(this.myForm);
      const roles = [];
      roles.push(RoleUser[this.rolUser].toUpperCase());
      const signUpRequest = new SignUpRequest(this.email, this.password, roles);
      console.log(signUpRequest);
      this.authenticationService.signUp(signUpRequest).then(value => {
        if (value) {
          this.authenticationService.signIn(new SignInRequest(this.email, this.password)).then((value) => {
            const employeeRequest = new CreateEmployeeRequest(
              this.lastName,
              this.firstName,
              this.phoneNumber,
              this.email,
              1200,
              new ContractInformationResource(
                // not compatible with any of standard forms ("yyyy-MM-dd'T'HH:mm:ss.SSSX", "yyyy-MM-dd'T'HH:mm:ss.SSS", "EEE, dd MMM yyyy HH:mm:ss zzz", "yyyy-MM-dd"))
                new Date().toISOString(),
                new Date().toISOString()
              ),

              RoleUser[this.rolUser].toUpperCase()
            );
            this.employeeApi.createEmployee(employeeRequest, this.email).then((value) => {
              if (value) {
                this.showMessage("Account creation successfully");
                this.employeeApi.setLocalProfile(this.email);
              }
            });
          });
        }
      });
    } else {
      this.showMessage('Please fill in all the fields');
    }
  }

  setRollUser(rollUser: number) {
    this.rolUser = rollUser === 1 ? RoleUser.EMPLOYEE : RoleUser.MANAGER;
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}


