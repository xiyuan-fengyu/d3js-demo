import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderMeshComponent } from './border-mesh.component';

describe('BorderMeshComponent', () => {
  let component: BorderMeshComponent;
  let fixture: ComponentFixture<BorderMeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorderMeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorderMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
