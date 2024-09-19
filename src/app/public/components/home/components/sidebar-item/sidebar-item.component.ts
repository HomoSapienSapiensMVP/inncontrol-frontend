import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {PanelCardIcon} from "../../../../../shared/model/panel/panel-card-icon";
import {AuthenticationService} from "../../../../../iam/services/authentication.service";

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})
export class SidebarItemComponent {

  @Input() icon: PanelCardIcon
  @Input() title: string;
  @Input() toRoute: string;
  @Input() logout: boolean;

  constructor(private route: Router, private authService: AuthenticationService) {
    this.icon = {} as PanelCardIcon;
    this.title = '';
    this.toRoute = '';
    this.logout = false;
  }

  /**
   * Navigates to the route declared in the toRoute input
   */
  onClick() {
    if (this.logout) {
      this.authService.signOut();
    } else {
      this.route.navigate([this.toRoute]);
    }
  }
}
