import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddserverconfigComponent } from './addserverconfig.component';

describe('AddserverconfigComponent', () => {
  let component: AddserverconfigComponent;
  let fixture: ComponentFixture<AddserverconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddserverconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddserverconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
