import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreateDialogComponent } from './room-create-dialog.component';

describe('TaskCreateDialogComponent', () => {
  let component: RoomCreateDialogComponent;
  let fixture: ComponentFixture<RoomCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoomCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
