import { Injectable, inject } from '@angular/core';
// para hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
// importar la interfaz Usuarios
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // 1. INYECCIÓN DE DEPENDENCIAS ---------------------------------------
  private _httpClient = inject(HttpClient);

  // 2. RUTA DE CONEXIÓN CON EL BACKEND ----------------------------------
  private URL_USUARIOS = 'http://localhost:3000/usuarios/'; //ruta genérica

  // 3. HACER LAS PETICIONES ---------------------------------------------

  // Petición POST
  postUsuarios(user: User | null) {
    // para crear un usuario, necesito la ruta y el body
    return this._httpClient.post(this.URL_USUARIOS + '/crear', user);
  }

  // Petición GET
  getUsuarios() {
    return this._httpClient.get(this.URL_USUARIOS + '/obtener');
  }

  // Petición PUT 
  putUsuarios(usuarioActualizado: User, id: string) {
    return this._httpClient.put(this.URL_USUARIOS + '/actualizar/' + id, usuarioActualizado);
  }

  // Petición DELETE 
  deleteUsuarios(id: string) {
    return this._httpClient.delete(this.URL_USUARIOS + '/eliminar/' + id);
  }
}