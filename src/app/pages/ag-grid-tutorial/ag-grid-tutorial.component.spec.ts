import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTutorialComponent } from './ag-grid-tutorial.component';

describe('AgGridTutorialComponent', () => {
  let component: AgGridTutorialComponent;
  let fixture: ComponentFixture<AgGridTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridTutorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgGridTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
