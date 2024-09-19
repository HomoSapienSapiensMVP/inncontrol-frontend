import {Component, Input} from '@angular/core';
import {PanelCardIcon} from "../../../../shared/model/panel/panel-card-icon";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../iam/services/authentication.service";
import {EmployeeApiService} from "../../../../shared/services/employee-api.service";

@Component({
  selector: 'app-panel-card-icon',
  templateUrl: './panel-card-icon.component.html',
  styleUrl: './panel-card-icon.component.css'
})
export class PanelCardIconComponent {

  @Input() icon: PanelCardIcon
  @Input() title: string;
  @Input() toRoute: string

  constructor(private route: Router, private iamService: AuthenticationService) {
    this.icon = {} as PanelCardIcon;
    this.title = '';
    this.toRoute = '';
  }

  /**
   * Navigates to the route declared in the toRoute input
   */
  onClick() {
    if (this.toRoute.includes('profile')) {
      this.route.navigate([this.toRoute, this.iamService.niceUserName]).then();
    } else {
      this.route.navigate([this.toRoute]);
    }
  }
}
