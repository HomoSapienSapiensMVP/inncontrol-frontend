import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerInput} from "@angular/material/datepicker";
import {MatDatepickerToggle} from "@angular/material/datepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {provideNativeDateAdapter} from "@angular/material/core";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatSelect} from "@angular/material/select";
import {
  TaskCreateDialogComponent
} from "./display/task/task-create/components/task-create-dialog/task-create-dialog.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {TasksComponent} from "./public/pages/tasks/tasks.component";
import {RoomStateComponent} from "./public/pages/room-state/room-state.component";
import {MessagesComponent} from "./public/pages/messages/messages.component";
import {EmployeesComponent} from "./public/pages/employees/employees.component";
import {SearchContentComponent} from "./public/components/home/components/search-content/search-content.component";
import {
  ExpenseTableComponent
} from "./payments/expenses/expenses-tracking-component/expense-table/expense-table.component";
import {
  ExpenseAddButtonComponent
} from "./payments/expenses/expenses-tracking-component/expense-add-button/expense-add-button.component";
import {
  ExpenseAddDialogComponent
} from "./payments/expenses/expenses-tracking-component/expense-add-dialog/expense-add-dialog.component";
import {
  NotificationsCardComponent
} from "./monitoring/notifications/components/notifications-card/notifications-card.component";
import {
  ExpenseContentComponent
} from "./payments/expenses/expenses-tracking-component/expense-content/expense-content.component";
import {
  NotificationsViewComponent
} from "./monitoring/notifications/components/notifications-view/notifications-view.component";
import {
  NotificationsBadgeComponent
} from "./monitoring/notifications/components/notifications-badge/notifications-badge.component";
import {InventoryComponent} from "./public/pages/inventory/inventory.component";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";
import {MatBadgeModule} from "@angular/material/badge";
import {TaskContentComponent} from './display/task/task-content/task-content.component';
import {TaskCreationComponent} from "./display/task/task-create/components/task-creation/task-creation.component";
import {
  RoomCreateDialogComponent
} from "./display/room/components/room-create-dialog/room-create-dialog.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RoomUpdateComponent} from "./execution/components/room-management/room-update/room-update.component";
import {MatMenuModule} from "@angular/material/menu";
import {LoginComponent} from "./iam/pages/login/login.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";
import {
  UserProfileContentComponent
} from './display/user-view/pages/user-profile-content/user-profile-content.component';
import {UserEditDialogComponent} from './display/user-view/components/user-edit-dialog/user-edit-dialog.component';
import {PanelCardIconComponent} from './interactions/control/components/panel-card-icon/panel-card-icon.component';
import {PanelScheduleComponent} from './interactions/control/components/panel-schedule/panel-schedule.component';
import {
  PanelCardIconViewComponent
} from './interactions/control/components/panel-card-icon-view/panel-card-icon-view.component';
import {ControlPanelPageComponent} from './interactions/control/pages/control-panel-page/control-panel-page.component';
import {RoomCreateButtonComponent} from './display/room/components/room-create-button/room-create-button.component';
import {
  MessagesContainerComponent
} from './interactions/messages/components/messages-container/messages-container.component';
import {MessagesCardComponent} from './interactions/messages/components/messages-card/messages-card.component';
import {
  MessagesCardDialogComponent
} from './interactions/messages/components/messages-card-dialog/messages-card-dialog.component';
import {
  MessagesNewMessageDialogComponent
} from './interactions/messages/components/messages-new-message-dialog/messages-new-message-dialog.component';
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {TaskCardComponent} from './display/task/task-cards/task-card/task-card.component';
import {
  TaskEditDialogComponent
} from './display/task/task-create/components/task-edit-dialog/task-edit-dialog.component';
import {RoomsCardComponent} from './display/room/components/rooms-card/rooms-card.component';
import {RoomCardContentComponent} from './display/room/components/room-card-content/room-card-content.component';
import {PerformanceReportComponent} from "./planning/performance-report/performance-report.component";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {ScheduleViewComponent} from './planning/schedule/components/schedule-view/schedule-view.component';
import {SchedulePageComponent} from './planning/schedule/pages/schedule-page/schedule-page.component';
import {SidebarContentComponent} from './public/components/home/components/sidebar-content/sidebar-content.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {SidebarItemComponent} from './public/components/home/components/sidebar-item/sidebar-item.component';
import {InventoryCardsComponent} from "./supply/inventory/inventory-cards/inventory-cards.component";
import {InventoryContentComponent} from "./supply/inventory/inventory-content/inventory-content.component";
import {
  InventoryCreateDialogComponent
} from "./supply/inventory/inventory-create/components/inventory-create-dialog/inventory-create-dialog.component";
import {
  InventoryCreationComponent
} from "./supply/inventory/inventory-create/components/inventory-creation/inventory-creation.component";
import {
  InventoryEditDialogComponent
} from "./supply/inventory/inventory-create/components/inventory-edit-dialog/inventory-edit-dialog.component";
import {InventoryCardDialogComponent} from "./supply/inventory/inventory-card-dialog/inventory-card-dialog.component";
import {
  InventoryDeleteDialogComponent
} from "./supply/inventory/inventory-delete-dialog/inventory-delete-dialog.component";
import {
  EmployeesContainerComponent
} from "./monitoring/employees/components/employees-container/employees-container.component";
import {EmployeeCardComponent} from './monitoring/employees/components/employee-card/employee-card.component';
import {EmployeeDialogComponent} from './monitoring/employees/components/employee-dialog/employee-dialog.component';
import {NgOptimizedImage} from "@angular/common";
import {FooterContentComponent} from './public/components/home/components/footer-content/footer-content.component';
import {AuthenticationInterceptor} from "./iam/services/authentication.interceptor";
import { TaskViewCardComponent } from './display/task/task-view-card/task-view-card.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryContentComponent,
    TasksComponent,
    TaskCreateDialogComponent,
    InventoryContentComponent,
    PageNotFoundComponent,
    TasksComponent,
    RoomStateComponent,
    MessagesComponent,
    EmployeesComponent,
    SearchContentComponent,
    ExpenseTableComponent,
    ExpenseAddButtonComponent,
    ExpenseAddDialogComponent,
    ExpenseContentComponent,
    NotificationsCardComponent,
    NotificationsViewComponent,
    NotificationsBadgeComponent,
    PerformanceReportComponent,
    InventoryComponent,
    TaskContentComponent,
    TaskCreationComponent,
    RoomCreateDialogComponent,
    RoomUpdateComponent,
    RoomCreateButtonComponent,
    InventoryCardsComponent,
    InventoryContentComponent,
    InventoryCreateDialogComponent,
    InventoryCreationComponent,
    InventoryEditDialogComponent,
    InventoryCardDialogComponent,
    InventoryDeleteDialogComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileContentComponent,
    UserEditDialogComponent,
    PanelCardIconComponent,
    PanelScheduleComponent,
    PanelCardIconViewComponent,
    ControlPanelPageComponent,
    MessagesContainerComponent,
    MessagesCardComponent,
    MessagesCardDialogComponent,
    MessagesNewMessageDialogComponent,
    TaskCardComponent,
    TaskEditDialogComponent,
    RoomsCardComponent,
    RoomCardContentComponent,
    ScheduleViewComponent,
    SchedulePageComponent,
    SidebarContentComponent,
    SidebarItemComponent,
    EmployeesContainerComponent,
    EmployeeCardComponent,
    EmployeeDialogComponent,
    FooterContentComponent,
    TaskViewCardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbar,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogClose,
    MatDialogTitle,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatTable,
    MatPaginator,
    MatHeaderRow,
    MatRow,
    MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatSort,
    MatSortHeader,
    MatIcon,
    MatSelect,
    MatOption,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteTrigger,
    MatAutocomplete,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MatSidenavModule,
    MatNavList,
    MatListItem,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
