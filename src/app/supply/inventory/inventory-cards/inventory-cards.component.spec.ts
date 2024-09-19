import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCardsComponent } from './inventory-cards.component'

describe('InventoryCardComponent', () => {
  let component: InventoryCardsComponent;
  let fixture: ComponentFixture<InventoryCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventoryCardsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InventoryCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
