import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseContentComponent } from './expense-content.component';

describe('ExpenseContentComponent', () => {
  let component: ExpenseContentComponent;
  let fixture: ComponentFixture<ExpenseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
