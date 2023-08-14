import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  
  constructor() {
    const authToken = sessionStorage.getItem('authToken'); 
    if (authToken) {

      this.isLoggedIn = true;
   }
  }

  get _isLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    sessionStorage.clear();
  }

}
