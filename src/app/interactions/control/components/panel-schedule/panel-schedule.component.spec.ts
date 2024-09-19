import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelScheduleComponent } from './panel-schedule.component';

describe('PanelScheduleComponent', () => {
  let component: PanelScheduleComponent;
  let fixture: ComponentFixture<PanelScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
