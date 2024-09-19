import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCardDialogComponent } from './inventory-card-dialog.component';

describe('InventoryCardDialogComponent', () => {
  let component: InventoryCardDialogComponent;
  let fixture: ComponentFixture<InventoryCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryCardDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
