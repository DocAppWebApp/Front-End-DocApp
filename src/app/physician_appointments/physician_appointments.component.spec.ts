import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Physician_AppointmentsComponent } from './physician_appointments.component';

describe('AppointmentsComponent', () => {
  let component: Physician_AppointmentsComponent;
  let fixture: ComponentFixture<Physician_AppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Physician_AppointmentsComponent]
    });
    fixture = TestBed.createComponent(Physician_AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
