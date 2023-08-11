import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-physician_appointments',
  templateUrl: './physician_appointments.component.html',
  styleUrls: ['./physician_appointments.component.css']
})
export class Physician_AppointmentsComponent {
  calendarOptions: CalendarOptions = {
    customButtons: {
      myCustomButton: {
        text: 'custom!',
        click: function() {
          alert('clicked the custom button!');
        }
      }
    },
    aspectRatio: 2,
    weekends: false,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
    headerToolbar: {
      left: 'prev,next today myCustomButton',
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
}
