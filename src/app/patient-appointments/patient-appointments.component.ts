import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css'],
})
export class PatientAppointmentsComponent {
  appointments: any[] = [];
  physicians: any[] = [];
  appointmentsAvailable: any[] = [];
  viewAppointment: any = {};
  physicianDicitionary: any = {};
  patientName: any = '';
  patientEmail: any = '';

  dateSelected: string = ' ';
  startTimeSelected: string = ' ';
  physicianSelected: string = ' ';
  physicianEmail: string = '';
  submitButtonEnabled: boolean = true;

  get uniquePhysicians() {
    return [
      ...new Set(
        this.appointmentsAvailable.map(
          (appointment) => appointment.physicianEmail
        )
      ),
    ];
  }


  get physicianDates() {
    return [
      ...new Set(
        this.appointmentsAvailable
          .filter(
            (appointment) =>
              appointment.physicianEmail == this.physicianSelected
          )
          .map((appointment) => appointment.Date)
      ),
    ];
  }

  get schedulesTimes() {
    return [
      ...new Set(
        this.appointmentsAvailable
          .filter(
            (appointment) =>
              appointment.physicianEmail == this.physicianSelected &&
              appointment.Date == this.dateSelected
          )
          .map((appointment) => appointment.startTime)
      ),
    ];
  }
  get _idToBeScheduled() {
    return [
      ...new Set(
        this.appointmentsAvailable
          .filter(
            (appointment) =>
              appointment.physicianEmail == this.physicianSelected &&
              appointment.Date == this.dateSelected &&
              appointment.startTime == this.startTimeSelected
          )
          .map((appointment) => appointment._id)
      ),
    ];
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsername();
    this.getAppointmentList();
    this.getPhysicians();
  }

  getUsername() {
    this.patientEmail = sessionStorage.getItem('email');

    let bodyData = {
      email: this.patientEmail,
    };

    this.http
      .post('http://localhost:4000/patient/name', bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.patientName = resultData.message;
        } else {
          alert('User Not Found');
        }
      });
  }
  getPhysicians() {
    let bodyData = {};

    this.http
      .post('http://localhost:4000/physician/list', bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.physicians = resultData.message;
        } else {
          alert('User Not Found');
        }
      });
  }

  getAppointmentList() {
    let bodyData = {
      type: 0,
      patientEmail: this.patientEmail,
      isBooked: true,
    };

    this.http
      .post('http://localhost:4000/appointment/list', bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.appointments = resultData.message;
        } else {
          alert('There are no appointments scheduled!');
        }
      });
  }
  cancelAppointment(id: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      let bodyData = {
        _id: id,
        patientEmail: '',
        isBooked: false,
      };

      this.http
        .post('http://localhost:4000/appointment/update', bodyData)
        .subscribe((resultData: any) => {
          if (resultData.status) {
            alert('Appointment Canceled!');
            this.reloadComponent();
          } else {
            alert('Error in appointment Cancelation');
          }
        });
    }
  }

  infoAppointment(id: string) {
    let bodyData = {
      type: 2,
      _id: id,
      patientEmail: this.patientEmail,
      isBooked: true,
    };

    this.http
      .post('http://localhost:4000/appointment/list', bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.viewAppointment = resultData.message[0];
        } else {
          alert('Error retreiving the information, please try again');
        }
      });
  }

  onSelectChange(step: number) {
    if (step === 1) {
      this.dateSelected = ' ';
      this.startTimeSelected = ' ';
    } else if (step === 2) {
      this.startTimeSelected = ' ';
    } else if (step === 3) {
      this.submitButtonEnabled = false;
    }
  }

  startAppointment() {
    this.dateSelected = ' ';
    this.startTimeSelected = ' ';
    this.physicianSelected = ' ';
    this.getavailableAppointmentList();
  }
  getavailableAppointmentList() {
    let bodyData = {
      type: 3,
    };

    this.http
      .post('http://localhost:4000/appointment/list', bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          this.appointmentsAvailable = resultData.message;
        } else {
          alert('There are no appointments scheduled!');
        }
      });
  }

  createAppointment() {
    let bodyData = {
      _id: this._idToBeScheduled,
      patientEmail: this.patientEmail,
      isBooked: true,
    };

    this.http
      .post('http://localhost:4000/appointment/update', bodyData)
      .subscribe((resultData: any) => {
        if (resultData.status) {
          alert('Appointment Created!');
          this.reloadComponent();
        } else {
          alert('Error in appointment Cancelation');
        }
      });
  }

  reloadComponent() {
    const currentUrl = this.router.url; // Get the current route URL
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate back to the current route
      this.router.navigate([currentUrl]);
    });
  }
}
