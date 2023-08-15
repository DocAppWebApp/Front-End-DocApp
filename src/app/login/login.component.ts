/*login user to test

user: physiciantest
email:  physiciantest@gmail.com
password: 123

user: patienttest
email:  patienttest@gmail.com
password: 123

*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string="";
  password: string="";

  constructor(private router: Router ,private http: HttpClient, private authService: AuthService){}

  ngOnInit(): void {
    // Initialization code goes here if needed
  }

  login (){
    console.log("entrando a login");
    let btn_patient = document.getElementById("patient") as HTMLInputElement;
    let btn_physician = document.getElementById("physician") as HTMLInputElement;

    if (btn_patient.checked) {
      let loginData = {
        email: this.email,
        password: this.password
      }
      this.http.post("http://localhost:4000/patient/login",loginData).subscribe((resultData: any)=>{
        if(resultData.status){
          alert("Welcome to Docap! let´s check your scheduled appointments");
          this.authService.login();
          sessionStorage.setItem("email",loginData.email);
          sessionStorage.setItem("type","patient");
          this.router.navigateByUrl('/patient');
        }else{
          alert('incorrect email or password');
        }
      });
    } else if (btn_physician.checked) {
      let loginData = {
        email: this.email,
        password: this.password
      } 
      this.http.post("http://localhost:4000/physician/login",loginData).subscribe((resultData: any)=>{
        if(resultData.status){
          alert("Welcome to Docap! let´s check your patient´s new appointments");
          sessionStorage.setItem("email",this.email);
          sessionStorage.setItem("type","physician");
          this.authService.login();
          this.router.navigateByUrl('/physicianappointments');
        }else{
          alert('incorrect email or password');
        }
      });
    } else {
      alert("Select if you are loging in as patient or physician")
    }
  }
}
