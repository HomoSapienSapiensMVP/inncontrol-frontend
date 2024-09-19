import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStateComponent } from './room-state.component';

describe('RoomStateComponent', () => {
  let component: RoomStateComponent;
  let fixture: ComponentFixture<RoomStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
