import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent {
  appointments: any [] = [];
  patientName: any = "";
  patientEmail: any = "";
  constructor(private http: HttpClient, public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.getUsername();
    this.getAppointmentList();


  }

  getUsername(){
    this.patientEmail=sessionStorage.getItem("email");
    
    let bodyData = {
      email: this.patientEmail
    };
    console.log(bodyData);
    this.http
      .post('http://localhost:4000/patient/name', bodyData)
      .subscribe((resultData: any) => {
        console.log(resultData);
        if(resultData.status){
         this.patientName=resultData.message;
        }else{
          alert('User Not Found');
        }
       
      });
  }

  getAppointmentList(){
    let bodyData = {
      type:0,
      patientEmail: this.patientEmail,
      isBooked: true
    };

    this.http
      .post('http://localhost:4000/appointment/list', bodyData)
      .subscribe((resultData: any) => {
        if(resultData.status){
         this.appointments=resultData.message;
        }else{
          alert('There are no appointments scheduled!');
        }
       
      });
  }
  cancelAppointment(id:string){
    
    if(confirm("Are you sure you want to cancel this appointment?")){
      let bodyData = {
        _id:id,
        patientEmail: "",
        isBooked: false
      };
     
      this.http
        .post('http://localhost:4000/appointment/update', bodyData)
        .subscribe((resultData: any) => {
          if(resultData.status){
            alert('Appointment Canceled!');
            this.reloadComponent();
          }else{
            alert('Error in appointment Cancelation');
          }
      });
    }    
  }

  reloadComponent() {
    const currentUrl = this.router.url; // Get the current route URL
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate back to the current route
      this.router.navigate([currentUrl]);
    });
  }
}
