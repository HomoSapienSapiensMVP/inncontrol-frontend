import {Component} from '@angular/core';
import {PanelCard} from "../../../../shared/model/panel/panel-card";
import {PanelCardIcon} from "../../../../shared/model/panel/panel-card-icon";
import { RoleUser } from '../../../../iam/model/roll-user';
import { AuthenticationService } from '../../../../iam/services/authentication.service';

@Component({
  selector: 'app-control-panel-page',
  templateUrl: './control-panel-page.component.html',
  styleUrl: './control-panel-page.component.css'
})
export class ControlPanelPageComponent {

  controlPanelCards: PanelCard[];
  managePanelCards: PanelCard[];
  roles = RoleUser;
  role: RoleUser = RoleUser.NONE;

  constructor(private iamService: AuthenticationService) {
    iamService.currentRole.subscribe(value => {
      this.role = value;
    });
    this.controlPanelCards = [
      new PanelCard('Tareas', PanelCardIcon.Tasks, '/tasks', false),
      new PanelCard('Habitaciones', PanelCardIcon.Rooms, '/rooms', false),
      //new PanelCard('Mensajes', PanelCardIcon.Messages, '/messages', false),
      new PanelCard('Perfil', PanelCardIcon.Profile, '/profile', false),
    ];
    this.managePanelCards = [
      new PanelCard('Empleados', PanelCardIcon.Employees, '/employees', true),
      //new PanelCard('Inventario', PanelCardIcon.Inventory, '/inventory', false),
    ];
  }
}
