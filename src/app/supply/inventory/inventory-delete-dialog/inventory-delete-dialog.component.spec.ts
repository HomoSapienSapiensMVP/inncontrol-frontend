import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDeleteDialogComponent } from './inventory-delete-dialog.component';

describe('InventoryDeleteDialogComponent', () => {
  let component: InventoryDeleteDialogComponent;
  let fixture: ComponentFixture<InventoryDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
