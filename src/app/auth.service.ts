import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  
  constructor() {
    const authToken = sessionStorage.getItem('authToken'); // Puedes usar también localStorage si prefieres.
    if (authToken) {
      // Si existe el token, establece el estado de autenticación en true.
      this.isLoggedIn = true;
   }
  }

  get _isLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  login() {
    // Aquí debes implementar la lógica para autenticar al usuario.
    // Supongamos que la autenticación ha sido exitosa y establecemos isLoggedIn en true.
    this.isLoggedIn = true;
  }

  logout() {
    // Aquí puedes implementar la lógica para cerrar sesión si es necesario.
    // Supongamos que cuando el usuario cierra sesión, establecemos isLoggedIn en false.
    this.isLoggedIn = false;
  }

}
