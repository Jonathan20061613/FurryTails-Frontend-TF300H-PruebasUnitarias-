import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mascotas } from '../interfaces/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {

  // Inyección de dependencias
  private _httpClient = inject(HttpClient);

  // Ruta de conexión con el backend
  private URL_MASCOTAS = 'http://localhost:3000/mascotas';

  // Petición POST para crear una mascota
  postMascota(mascota: Mascotas) {
    return this._httpClient.post(this.URL_MASCOTAS + '/', mascota);
  }

  // Petición GET para obtener todas las mascotas
  getMascotas() {
    return this._httpClient.get(this.URL_MASCOTAS + '/');
  }

  getMascota(id: string) {
    return this._httpClient.get(this.URL_MASCOTAS + '/' + id);
  }

  // Petición PUT para actualizar información de una mascota
  putMascota(mascotaActualizada: Mascotas, id: string) {
    return this._httpClient.put(this.URL_MASCOTAS + '/' + id, mascotaActualizada);
  }

  // Petición DELETE para eliminar una mascota
  deleteMascota(id: string) {
    return this._httpClient.delete(this.URL_MASCOTAS + '/' + id);
  }
}