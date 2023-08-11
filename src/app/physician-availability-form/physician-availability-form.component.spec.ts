import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianAvailabilityFormComponent } from './physician-availability-form.component';

describe('PhysicianAvailabilityFormComponent', () => {
  let component: PhysicianAvailabilityFormComponent;
  let fixture: ComponentFixture<PhysicianAvailabilityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhysicianAvailabilityFormComponent]
    });
    fixture = TestBed.createComponent(PhysicianAvailabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
