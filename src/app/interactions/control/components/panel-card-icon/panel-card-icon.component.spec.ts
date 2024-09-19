import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCardIconComponent } from './panel-card-icon.component';

describe('PanelCardIconComponent', () => {
  let component: PanelCardIconComponent;
  let fixture: ComponentFixture<PanelCardIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelCardIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelCardIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
