import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesNewMessageDialogComponent } from './messages-new-message-dialog.component';

describe('MessagesNewMessageDialogComponent', () => {
  let component: MessagesNewMessageDialogComponent;
  let fixture: ComponentFixture<MessagesNewMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesNewMessageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesNewMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
