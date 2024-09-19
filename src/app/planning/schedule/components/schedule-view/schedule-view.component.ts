import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef,
  Component, ElementRef, Input, ViewChild,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
  startOfHour, differenceInMinutes,
} from 'date-fns';
import {Subject} from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {EmployeeApiService} from "../../../../shared/services/employee-api.service";
import {TaskApiService} from "../../../../shared/services/task/task-api.service";
import {Task} from "../../../../shared/model/task/task.entity";
import {MatDialog} from "@angular/material/dialog";
import {TaskViewCardComponent} from "../../../../display/task/task-view-card/task-view-card.component";

const colors: Record<string, EventColor> = {
  "red": {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  "blue": {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  "yellow": {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .scroll-container {
        height: calc(100vh - 320px);
        overflow-y: auto;
      }
    `,
  ],
})
export class ScheduleViewComponent implements AfterViewInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh = new Subject<void>();

  @Input() canChangeView: boolean = true;

  @Input() view: CalendarView = CalendarView.Month;

  @Input() activeDayIsOpen: boolean = true;

  constructor(private cdr: ChangeDetectorRef,
              private employeeService: EmployeeApiService,
              private scheduleService: TaskApiService,
              private dialog: MatDialog
  ) {
    employeeService.getCurrentUser().subscribe((employee) => {
      this.fetchEvents();
    });
  }

  calendarEventsFromTasks(tasks: Task[]): CalendarEvent[] {
    return tasks.map((task) => {
      return {
        title: task.name,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate),
        color: task.pending ? colors["red"] : colors["blue"],
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
        meta: task,
      };
    });
  }

  fetchEvents() {
    this.scheduleService.getMyTasks().subscribe((events) => {
      this.events = this.calendarEventsFromTasks(events);
      this.refresh.next();
    });
  }

  events: CalendarEvent[] = []

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) || events.length === 0);
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Event action:', action, event);
    const task = event.meta as Task;
    const dialogRef = this.dialog.open(TaskViewCardComponent, {
      data: task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchEvents();
      }
    });
  }


  addEvent()
    :
    void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors["red"],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete
                :
                CalendarEvent
  ) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view
            :
            CalendarView
  ) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngAfterViewInit()
    :
    void {
    this.scrollToCurrentView();
  }

  viewChanged() {
    this.cdr.detectChanges();
    this.scrollToCurrentView();
  }

  scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }
}
