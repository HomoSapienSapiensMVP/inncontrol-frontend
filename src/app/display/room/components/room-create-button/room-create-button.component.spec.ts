import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreateButtonComponent } from './room-create-button.component';

describe('RoomCreateButtonComponent', () => {
  let component: RoomCreateButtonComponent;
  let fixture: ComponentFixture<RoomCreateButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCreateButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
