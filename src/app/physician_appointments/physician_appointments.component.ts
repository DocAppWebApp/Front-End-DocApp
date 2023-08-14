import { Component, ViewChild, ɵclearResolutionOfComponentResourcesQueue  } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { HttpClient } from '@angular/common/http';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-physician_appointments',
  templateUrl: './physician_appointments.component.html',
  styleUrls: ['./physician_appointments.component.css']
})
export class Physician_AppointmentsComponent {
  
  @ViewChild('calendar') calendarComponent: any;

  ngOnInit(): void{
     this.update();
  }

  constructor(private http: HttpClient){}
  

  calendarOptions: CalendarOptions = {
    aspectRatio: 1.7,
    weekends: false,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    selectable: true,
    dateClick: function(info) {
      alert('Clicked on: ' + info.dateStr+'   /   Current view: ' + info.view.type);
    },
    events: [
      {
        title: 'My event',
        start: '2023-08-24T10:00:00', 
        end: '2023-08-24T14:00:00',   
        constraint: 'businessHours'  
      }
    ],
    businessHours: true
  };

  update(){
    console.log("entrando a update");
    let physicianData = {
      "type":1,
      "physicianEmail":sessionStorage.getItem("email"),
      "isBooked":false
    };
    let schedulesToShow: { title: string, start: string, end: string, constraint: string }[] = [];
    try {
      this.http.post("http://localhost:4000/appointment/list", physicianData).subscribe((resultData:any)=>{
        console.log(resultData);
        let schedules=resultData.message;
        
        for(let i=0; i < schedules.length; i++){
          let splitedDate = schedules[i].Date.split("T");  

          let showAppointments={
            title: "Available",
            start: splitedDate[0]+"T"+schedules[i].startTime+":00", 
            end: splitedDate[0]+"T"+schedules[i].endTime+":00",   
            constraint: 'businessHours' 
          };
          schedulesToShow.push(showAppointments);
        }
        console.log("Data transformed:");
        console.log(schedulesToShow);
      });
      
      //patient scheduled appointments to the doctor logged in 
      physicianData.isBooked=true;
      this.http.post("http://localhost:4000/appointment/list", physicianData).subscribe((resultData:any)=>{
        console.log(resultData);  

        let schedules2=resultData.message;
        for(let i=0; i < schedules2.length; i++){
          let splitedDate2 = schedules2[i].Date.split("T");  

          let showAppointments={
            title: schedules2[i].patientEmail,
            start: splitedDate2[0]+"T"+schedules2[i].startTime+":00", 
            end: splitedDate2[0]+"T"+schedules2[i].endTime+":00",   
            constraint: 'businessHours', 
            backgroundColor: 'red'
          };
          schedulesToShow.push(showAppointments);
        }
        console.log("Data transformed2:");
        console.log(schedulesToShow);
        this.calendarOptions.events=schedulesToShow;
      });
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }
}