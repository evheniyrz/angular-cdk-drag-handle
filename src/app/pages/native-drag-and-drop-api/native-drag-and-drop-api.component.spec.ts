import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeDragAndDropApiComponent } from './native-drag-and-drop-api.component';

describe('NativeDragAndDropApiComponent', () => {
  let component: NativeDragAndDropApiComponent;
  let fixture: ComponentFixture<NativeDragAndDropApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeDragAndDropApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NativeDragAndDropApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
