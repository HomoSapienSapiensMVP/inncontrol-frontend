import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesCardDialogComponent } from './messages-card-dialog.component';

describe('MessagesCardDialogComponent', () => {
  let component: MessagesCardDialogComponent;
  let fixture: ComponentFixture<MessagesCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesCardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
