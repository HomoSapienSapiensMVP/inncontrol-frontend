import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {RoomStateComponent} from "./public/pages/room-state/room-state.component";
import {TasksComponent} from "./public/pages/tasks/tasks.component";
import {MessagesComponent} from "./public/pages/messages/messages.component";
import {EmployeesComponent} from "./public/pages/employees/employees.component";
import {InventoryComponent} from "./public/pages/inventory/inventory.component";
import {LoginComponent} from "./iam/pages/login/login.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
import {
  UserProfileContentComponent
} from "./display/user-view/pages/user-profile-content/user-profile-content.component";
import {ControlPanelPageComponent} from "./interactions/control/pages/control-panel-page/control-panel-page.component";
import {SchedulePageComponent} from "./planning/schedule/pages/schedule-page/schedule-page.component";
import {authenticationGuard, loginGuard} from "./iam/services/authentication.guard";

const routes: Routes = [
  // {path: 'home', component: HomeComponent},
  {path: 'schedule', component: SchedulePageComponent, canActivate: [authenticationGuard]},
  {path: 'control', component: ControlPanelPageComponent, canActivate: [authenticationGuard]},
  {path: 'tasks', component: TasksComponent, canActivate: [authenticationGuard]},
  {path: 'rooms', component: RoomStateComponent, canActivate: [authenticationGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [authenticationGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [authenticationGuard]},
  {path: 'inventory', component: InventoryComponent, canActivate: [authenticationGuard]},
  {path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  {path: 'register', component: SignUpComponent, canActivate: [loginGuard]},
  {path: 'profile/:username', component: UserProfileContentComponent, canActivate: [authenticationGuard]},
  {path: '', redirectTo: 'control', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
