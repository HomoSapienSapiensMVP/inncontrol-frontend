import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCardContentComponent } from './room-card-content.component';

describe('RoomCardContentComponent', () => {
  let component: RoomCardContentComponent;
  let fixture: ComponentFixture<RoomCardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCardContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
