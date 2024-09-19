import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/model/user/user';
import {UserApiServiceService} from '../../../../shared/services/user-api.service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {UserEditDialogComponent} from "../../components/user-edit-dialog/user-edit-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {RoleUser} from "../../../../iam/model/roll-user";
import {EmployeeApiService} from "../../../../shared/services/employee-api.service";

@Component({
  selector: 'app-user-profile-content',
  templateUrl: './user-profile-content.component.html',
  styleUrls: ['./user-profile-content.component.css']
})
export class UserProfileContentComponent implements OnInit {

  userLogged: User;
  username: string | null = '';

  isManager: boolean = false;

  constructor(
    private userService: EmployeeApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.userLogged = {} as User;
    this.userService.getCurrentUser().subscribe((user) => {
      this.isManager = user.rolUser == 1;
    });
  }

  UserProfileContentComponent(username: string) {
    this.username = username;
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username === null) {
      this.showMessage('Invalid username');
      return;
    }
    this.userService.fetchUser(this.username!).then((user) => {
      if (user) {
        this.userLogged = user;
      } else {
        this.showMessage('Invalid email or password');
      }
    }).catch((error) => {
      console.error(error);
      this.showMessage('An error occurred during login');
    });
  }

  showMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  rollDescription(): string {
    return this.userLogged.rolUser === 1 ? 'Manager' : 'Employee';
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '300px',
      data: this.userLogged
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userLogged = result;
      }
    });
  }

  protected readonly RoleUser = RoleUser;
}
