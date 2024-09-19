import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCardIconViewComponent } from './panel-card-icon-view.component';

describe('PanelCardIconViewComponent', () => {
  let component: PanelCardIconViewComponent;
  let fixture: ComponentFixture<PanelCardIconViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelCardIconViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelCardIconViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
