import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-physician-availability-form',
  templateUrl: './physician-availability-form.component.html',
  styleUrls: ['./physician-availability-form.component.css']
})
export class PhysicianAvailabilityFormComponent {

  email: string | null = null;
  date: Date= new Date();

  constructor(private router: Router, private http: HttpClient){}
  ngOnInit(): void {
    console.log("entrando al OnInit")
    this.email = sessionStorage.getItem("email");
  }
  register_availability() {
    let bodyData={
      "physicianEmail": this.email,
      "Date": this.date
    };
    console.log(bodyData);
    try {
      this.http.post("http://localhost:4000/appointment/saveday",bodyData).subscribe((resultData:any)=>{
        console.log(resultData);
        alert("Your availability has been succesfully been registered!"+resultData.message);
      }); 
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }
}
