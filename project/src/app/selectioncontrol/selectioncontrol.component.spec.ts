import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectioncontrolComponent } from './selectioncontrol.component';

describe('SelectioncontrolComponent', () => {
  let component: SelectioncontrolComponent;
  let fixture: ComponentFixture<SelectioncontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectioncontrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectioncontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
