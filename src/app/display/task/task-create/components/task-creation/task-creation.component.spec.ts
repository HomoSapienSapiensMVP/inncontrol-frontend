import { ComponentFixture, TestBed } from '@angular/core/testing';
//@ts-ignore
import { TaskCreationComponent } from './task-creation.component';

describe('TaskCreationComponent', () => {
  let component: TaskCreationComponent;
  let fixture: ComponentFixture<TaskCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
