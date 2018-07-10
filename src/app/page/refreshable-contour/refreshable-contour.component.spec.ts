import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshableContourComponent } from './refreshable-contour.component';

describe('RefreshableContourComponent', () => {
  let component: RefreshableContourComponent;
  let fixture: ComponentFixture<RefreshableContourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshableContourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshableContourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
