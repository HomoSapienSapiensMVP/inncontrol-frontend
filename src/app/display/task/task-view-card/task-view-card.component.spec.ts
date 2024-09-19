import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskViewCardComponent } from './task-view-card.component';

describe('TaskViewCardComponent', () => {
  let component: TaskViewCardComponent;
  let fixture: ComponentFixture<TaskViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskViewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
