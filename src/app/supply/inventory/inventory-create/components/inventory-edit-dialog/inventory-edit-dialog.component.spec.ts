import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditDialogComponent } from './inventory-edit-dialog.component';

describe('InventoryEditDialogComponent', () => {
  let component: InventoryEditDialogComponent;
  let fixture: ComponentFixture<InventoryEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryEditDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
