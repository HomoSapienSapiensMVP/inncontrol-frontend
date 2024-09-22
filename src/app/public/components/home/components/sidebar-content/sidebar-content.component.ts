import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {PanelCard} from "../../../../../shared/model/panel/panel-card";
import {PanelCardIcon} from "../../../../../shared/model/panel/panel-card-icon";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../../iam/services/authentication.service";
import { RoleUser } from '../../../../../iam/model/roll-user';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrl: './sidebar-content.component.css'
})
export class SidebarContentComponent {

  items: PanelCard[] = [
    new PanelCard('Pagina Principal', PanelCardIcon.Home, '/control', false),
    new PanelCard('Tareas', PanelCardIcon.Tasks, '/tasks', false),
    new PanelCard('Habitaciones', PanelCardIcon.Rooms, '/rooms', false),
    //new PanelCard('Inventario', PanelCardIcon.Inventory, '/inventory', true),
    new PanelCard('Empleados', PanelCardIcon.Employees, '/employees', true),
    //new PanelCard('Mensajes', PanelCardIcon.Messages, '/messages', false),
    new PanelCard('Perfil', PanelCardIcon.Profile, '/profile', false),
    //new PanelCard('Rendimiento', PanelCardIcon.Employees, '/performance', false),
  ]

  logout() {
    this.iamService.signOut();
  }

  protected readonly PanelCardIcon = PanelCardIcon;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  protected isLogged: boolean = false;
  private currentUsername: string = '';
  roles = RoleUser;
  role: RoleUser = RoleUser.NONE;

  constructor(
    private breakpointObserver: BreakpointObserver,
    protected iamService: AuthenticationService,
    private router: Router
  ) {

    iamService.isSignedIn.subscribe(value => {
      this.isLogged = value;
    });
    iamService.currentUserName.subscribe(value => {
      this.currentUsername = value;
    });
    iamService.currentRole.subscribe(value => {
      this.role = value;
      console.log(`Role: ${value}`);
    });
  }

  sendToRoute(toRoute: string) {
    if (toRoute === '/logout') {
      this.logout();
    } else if (toRoute.includes('profile')) {
      this.router.navigate([toRoute, this.currentUsername]);
    } else {
      this.router.navigate([toRoute]);
    }
  }
}
