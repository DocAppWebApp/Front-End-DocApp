import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  
  
  // Properties for user registration
  fullname: String ="";
  email: String = "";
  gender: String = "";
  dob: String ="";
  hcn: String="";
  sin: String="";
  phone: String="";
  mln: String="";
  password: String = "";

  constructor(private router: Router, private http: HttpClient){}

  ngOnInit(): void {
    // Initialization code goes here if needed
  }

  // Method for user registration
  register() {
    let actor = document.getElementById("actor") as HTMLInputElement;
    if (actor.textContent=='Patient'){
      // Prepare the request body with user data
      let bodyData = {
        "fullname": this.fullname,
        "email": this.email,
        "gender": this.gender,
        "birthdate": this.dob,
        "healthcard": this.hcn,
        "password": this.password
      };
      //test the data to send within the request
      console.log(bodyData);
      try {
        // Make an HTTP POST request to the server to save patient data
        this.http.post("http://localhost:4000/patient/save", bodyData).subscribe((resultData: any)=>{
          console.log(resultData);
          alert("User has been created successfully!");
          this.fullname="";
          this.email="";
          this.gender="";
          this.dob="";
          this.hcn="";
          this.password="";
          //this.router.navigateByUrl('/login');
        });
      } catch (error) {
        alert(error);
      }
    }else if(actor.textContent=='Physician'){
      let bodyData = {
        "fullname": this.fullname,
        "email": this.email,
        "status": "active",
        "sin": this.gender,
        "mln": this.hcn,
        "password": this.password
      };
      //test the data to send within the request
      console.log(bodyData);
      // Make an HTTP POST request to the server to save doctor data
      this.http.post("http://localhost:4000/physician/save", bodyData).subscribe((resultData: any)=>{
        console.log(resultData);
        alert("User has been created successfully!");
        this.fullname="";
        this.email="";
        this.gender="";
        this.dob="";
        this.hcn="";
        this.password="";
        //this.router.navigateByUrl('/login');
      });
    }
  }
  change_patient(){
    let option1 = document.getElementById("option1");
    let option2 = document.getElementById("option2");
    let option3 = document.getElementById("option3");
    let actor = document.getElementById("actor");
    let btn_doctor = document.getElementById("btn_doctor");
    let btn_patient = document.getElementById("btn_patient");
    if(btn_patient){
      if(btn_doctor){
        btn_doctor.style.backgroundColor= "white";
      }
      btn_patient.style.backgroundColor= "#5DBBFA";
    }
    if (option1) {
      option1.innerText = 'Gender';
    }
    if (option2) {
      option2.innerText = 'Date of Birth';
    }
    if (option3) {
      option3.innerText = 'Health Card ID';
    }
    if (actor) {
      actor.innerText = 'Patient';
    }
  }
  change_doctor(){
    let option1 = document.getElementById("option1");
    let option2 = document.getElementById("option2");
    let option3 = document.getElementById("option3");
    let actor = document.getElementById("actor");
    let btn_doctor = document.getElementById("btn_doctor");
    let btn_patient = document.getElementById("btn_patient");
    if(btn_doctor){
      if(btn_patient){
        btn_patient.style.backgroundColor= "white";
      }
      btn_doctor.style.backgroundColor= "#5DBBFA";
    }
    if (option1) {
      option1.innerText = 'SIN';
    }
    if (option2) {
      option2.innerText = 'Phone Number';
    }
    if (option3) {
      option3.innerText = 'Medical License Number';
    }if(actor){
      actor.innerText='Physician'
    }
  }  
}
