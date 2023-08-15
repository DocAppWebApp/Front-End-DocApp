import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  type:any="";
  
  constructor(public authService: AuthService){}
  ngOnInit(): void {
    this.type =sessionStorage.getItem("type");
  }
}
