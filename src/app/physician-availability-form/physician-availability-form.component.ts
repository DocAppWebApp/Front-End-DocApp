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
      "_idDate":"64d136dfba3c59ad9beb03b9",
      "physicianEmail": this.email,
      "Date": this.date
    };
    console.log(bodyData);
    this.http.post("http://localhost:4000/appointment/saveday",bodyData).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Your availability has been succesfully been registered!");
    });
  }
}
