import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserApiServiceService} from "../../../shared/services/user-api.service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RoleUser} from "../../model/roll-user";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";
import {EmployeeApiService} from "../../../shared/services/employee-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  password: string;
  email: string;

  // rolUser: RoleUser;

  constructor(private userService: UserApiServiceService,
              private snackBar: MatSnackBar,
              private route: Router,
              private authenticationService: AuthenticationService,
              private employeeApi: EmployeeApiService

  ) {
    this.email = '';
    this.password = '';
    // this.rolUser = RoleUser.Employee;
  }

  singInAccount() {
    if (this.myForm.valid) {
      const signInRequest = new SignInRequest(this.email, this.password);
      this.authenticationService.signIn(signInRequest).then(value => {
        if (value) {
          this.employeeApi.setLocalProfile(this.email);
        }
      });
    } else {
      this.showMessage('Invalid Form');
    }
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
