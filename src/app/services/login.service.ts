// inyección de dependencias -> Usar dependencias
import { Injectable, inject } from '@angular/core';
// importar el httpClient para poder hacer peticiones al back
import { HttpClient } from '@angular/common/http';
// importar el router nos va a permitir navegar en nuestro sitio web
import { Router } from '@angular/router';
// importar la dependencia para gestionar mensajes de respuesta
import { ToastrService } from 'ngx-toastr';
// importar la dependencia que nos permite decodificar el token
import { jwtDecode } from "jwt-decode";
// importar la interfaz para poder iniciar sesión
import { CredencialesAdmin } from '../interfaces/credenciales-admin';
import { CredencialesUser } from '../interfaces/credenciales-user';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  // 1. INYECTAR DEPENDENCIAS -------------------------------------------
  private _httpClient = inject(HttpClient);
  private _router = inject(Router);
  public _toastrService = inject(ToastrService);

  // 2. RUTA DE CONEXIÓN CON EL BACKEND ----------------------------------
  private URL_LOGIN_ADMIN = 'http://localhost:3000/loginAdmin';
  private URL_LOGIN_USER = "http://localhost:3000/loginUser";

  // 3. INICIAR SESIÓN (petición POST) -----------------------------------
  inicioSesionAdmin(credencialesIngreso: CredencialesAdmin) {
    return this._httpClient.post(this.URL_LOGIN_ADMIN, credencialesIngreso);
  }

  inicioSesionUser(credencialesIngreso: CredencialesUser) {
    return this._httpClient.post(this.URL_LOGIN_USER, credencialesIngreso);
  }

  // 4. OBTENER EL TOKEN -------------------------------------------------
  obtenerToken() {
    return localStorage.getItem('token');
  }

  // 5. VALIDAR SI ES O NO ADMINISTRADOR ---------------------------------
  esAdmin() {
    const token = this.obtenerToken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.isAdmin ? true : false;

    } else {
      console.error('No se encontró token')
      return false
    }
  }
  redireccionar() {
    if (this.esAdmin()) {
      this._router.navigate(['/admin']);

    } else {
      // Si no -> redireciona a la página de inicio
      this._router.navigate(['/']);
    }
  }

  // 6. SE INICIÓ SATISFACTORIAMENTE O NO SESIÓN --------------------------
  estaLogueado() {
    return this.obtenerToken() ? true : false;
  }


  // 7. CIERRE DE SESIÓN --------------------------------------------------
  cierreSesion() {
    this._toastrService.info('Cierre se sesión exitoso, hasta la próxima!');
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

}