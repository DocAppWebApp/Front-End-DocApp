import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-schedule-form',
  templateUrl: './patient-schedule-form.component.html',
  styleUrls: ['./patient-schedule-form.component.css'],
})
export class PatientScheduleFormComponent {
  appointments: any[] = [];
  physicianList: string[] = [];
  dateSelected: string = ' ';
  startTimeSelected: string = ' ';
  physicianSelected: string = ' ';
  physicianEmail: string = '';
  submitButtonEnabled: boolean = true;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.dateSelected = ' ';
    this.startTimeSelected = ' ';
    this.physicianSelected = ' ';
    this.getavailableAppointmentList();
    this.appointments.forEach((item) => {
      if (!this.physicianList.includes(item.physicianEmail)) {
        this.physicianList.push(item);
      }
    });
  }

  onSelectChange(value: number) {
    switch (value) {
      case 1:
        this.physicianSelected = ' ';
        break;
      case 2:
        this.dateSelected = ' ';
        break;
      case 3:
        this.startTimeSelected = ' ';
        break;
      default:
        break;
    }
    if (this.physicianSelected && this.dateSelected && this.startTimeSelected) {
      this.submitButtonEnabled = false;
    }
  }

  getavailableAppointmentList() {
    let bodyData = {
      type: 3,
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
    console.log(this.appointments);
  }

  createAppointment() {}
}
