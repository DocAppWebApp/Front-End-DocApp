import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientScheduleFormComponent } from './patient-schedule-form.component';

describe('PatientScheduleFormComponent', () => {
  let component: PatientScheduleFormComponent;
  let fixture: ComponentFixture<PatientScheduleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientScheduleFormComponent]
    });
    fixture = TestBed.createComponent(PatientScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
