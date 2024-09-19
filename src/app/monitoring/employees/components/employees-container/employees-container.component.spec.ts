import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesContainerComponent } from './employees-container.component';

describe('EmployeesContainerComponent', () => {
  let component: EmployeesContainerComponent;
  let fixture: ComponentFixture<EmployeesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
