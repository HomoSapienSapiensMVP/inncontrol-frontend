import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAddDialogComponent } from './expense-add-dialog.component';

describe('ExpenseAddDialogComponent', () => {
  let component: ExpenseAddDialogComponent;
  let fixture: ComponentFixture<ExpenseAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseAddDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
