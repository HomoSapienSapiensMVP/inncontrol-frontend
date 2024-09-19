import { Component } from '@angular/core';
import {CalendarView} from "angular-calendar";

@Component({
  selector: 'app-panel-schedule',
  templateUrl: './panel-schedule.component.html',
  styleUrl: './panel-schedule.component.css'
})
export class PanelScheduleComponent {

  protected readonly CalendarView = CalendarView;
}
