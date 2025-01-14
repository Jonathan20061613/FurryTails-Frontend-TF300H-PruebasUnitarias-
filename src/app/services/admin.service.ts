import { Injectable, inject } from '@angular/core';
// para hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
// importar la interfaz Usuarios
import { Admin } from '../interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // 1. INYECCIÓN DE DEPENDENCIAS ---------------------------------------
  private _httpClient = inject(HttpClient);

  // 2. RUTA DE CONEXIÓN CON EL BACKEND ----------------------------------
  private URL_ADMIN = 'http://localhost:3000/admin/'; //ruta genérica

  // 3. HACER LAS PETICIONES ---------------------------------------------

  // Petición POST
  postAdmin(admin: Admin) {
    // para crear un usuario, necesito la ruta y el body
    return this._httpClient.post(this.URL_ADMIN + '/crear', admin);
  }

  // Petición GET
  getAdmin() {
    return this._httpClient.get(this.URL_ADMIN + '/');
  }

  // Petición DELETE 
  deleteAdmin(id: string) {
    return this._httpClient.delete(this.URL_ADMIN + '/eliminar/' + id);
  }
}
