import { TestBed } from '@angular/core/testing';
import { MascotasService } from './mascotas.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Mascotas } from '../interfaces/mascotas';

describe('MascotasService', () => {
  let service: MascotasService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/mascotas/';

  const mockMascota: Mascotas = {
    imagen: 'imagen.jpg',
    nombre: 'Firulais',
    raza: 'Golden Retriever',
    edad: 3,
    propietario: 'Juan Pérez',
    estaAdoptado: false,
    _id: '123456'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MascotasService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(MascotasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  // Prueba POST: Crear mascota
  it('debería realizar una petición POST para crear una mascota', () => {
    const mockResponse = {
      mensaje: 'Mascota se agregó exitosamente',
      mascota: mockMascota
    };

    service.postMascota(mockMascota).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Prueba GET: Obtener todas las mascotas
  it('debería realizar una petición GET para obtener todas las mascotas', () => {
    const mockResponse = {
      mensaje: 'Mascotas obtenidas exitosamente',
      mascotas: [mockMascota]
    };

    service.getMascotas().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  // Prueba GET: Obtener una mascota por ID
  it('debería realizar una petición GET para obtener una mascota por ID', () => {
    const mockResponse = {
      mensaje: 'Mascota obtenida exitosamente',
      mascota: mockMascota
    };

    service.getMascota(mockMascota._id).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl + mockMascota._id);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  // Prueba PUT: Actualizar una mascota
  it('debería realizar una petición PUT para actualizar una mascota', () => {
    const updatedMascota = { ...mockMascota, nombre: 'Rex' };
    const mockResponse = {
      mensaje: 'Mascota actualizada exitosamente',
      mascota: updatedMascota
    };

    service.putMascota(updatedMascota, updatedMascota._id).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl + updatedMascota._id);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  // Prueba DELETE: Eliminar una mascota
  it('debería realizar una petición DELETE para eliminar una mascota', () => {
    const mockResponse = {
      mensaje: 'Mascota eliminada correctamente'
    };

    service.deleteMascota(mockMascota._id).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl + mockMascota._id);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});