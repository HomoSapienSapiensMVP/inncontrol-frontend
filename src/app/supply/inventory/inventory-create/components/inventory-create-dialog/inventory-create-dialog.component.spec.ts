import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCreateDialogComponent } from './inventory-create-dialog.component';

describe('InventoryCreateDialogComponent', () => {
  let component: InventoryCreateDialogComponent;
  let fixture: ComponentFixture<InventoryCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
