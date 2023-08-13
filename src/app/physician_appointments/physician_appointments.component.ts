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
     //
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
        start: '2023-07-24T10:00:00', // Replace with your event start time
        end: '2023-07-24T14:00:00',   // Replace with your event end time
        constraint: 'businessHours'   // Applying the "businessHours" constraint
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
    }
    try {
      this.http.post("http://localhost:4000/appointment/list", physicianData).subscribe((resultData:any)=>{
        console.log(resultData);
        let schedules=resultData.message;
        let schedulesToShow=[];
        for(let i=0; i < schedules.length; i++){
          let splitedDate = schedules[i].Date.split("T");
          //let time = splitedDate[1].slice(0,8);          

          let showAppointments={
            title: "Available",
            start: splitedDate[0]+"T"+schedules[i].startTime+":00", // Replace with your event start time
            end: splitedDate[0]+"T"+schedules[i].endTime+":00",   // Replace with your event end time
            constraint: 'businessHours' 
          };
          schedulesToShow.push(showAppointments);
        }
        console.log("Data transformed:");
        console.log(schedulesToShow);
        this.calendarOptions.events=schedulesToShow;
      });
      
      //patient scheduled appointments to the doctor logged in 
      physicianData.isBooked=true;
      this.http.post("http://localhost:4000/appointment/list", physicianData).subscribe((resultData:any)=>{
        console.log(resultData);  
      });      
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }
}