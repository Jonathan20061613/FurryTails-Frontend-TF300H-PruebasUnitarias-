import { TestBed } from '@angular/core/testing'; 
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MascotasService } from './mascotas.service';
import { Mascotas } from '../interfaces/mascotas';

describe('MascotasService', () => {
  let service: MascotasService;
  let httpTestingController: HttpTestingController;

  const mockMascota: Mascotas = {
    _id: '1',
    imagen: 'url_de_imagen',
    nombre: 'Firulais',
    raza: 'Perro',
    edad: 3,
    propietario: 'Juan Pérez',
    estaAdoptado: false,
  };

  const URL_MASCOTAS = 'http://localhost:3000/mascotas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MascotasService],
    });
    service = TestBed.inject(MascotasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call postMascota and return the created mascota', () => {
    service.postMascota(mockMascota).subscribe((res) => {
      expect(res).toEqual(mockMascota);
    });

    const req = httpTestingController.expectOne(`${URL_MASCOTAS}/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMascota);
  });

  it('should call getMascotas and return all mascotas', () => {
    const mockMascotas: Mascotas[] = [mockMascota];

    service.getMascotas().subscribe((res) => {
      expect(res).toEqual(mockMascotas);
    });

    const req = httpTestingController.expectOne(`${URL_MASCOTAS}/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMascotas);
  });

  it('should call getMascota and return a single mascota', () => {
    service.getMascota(mockMascota._id).subscribe((res) => {
      expect(res).toEqual(mockMascota);
    });

    const req = httpTestingController.expectOne(`${URL_MASCOTAS}/${mockMascota._id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMascota);
  });

  it('should call putMascota and return the updated mascota', () => {
    const updatedMascota: Mascotas = { ...mockMascota, nombre: 'Max' };

    service.putMascota(updatedMascota, mockMascota._id).subscribe((res) => {
      expect(res).toEqual(updatedMascota);
    });

    const req = httpTestingController.expectOne(`${URL_MASCOTAS}/${mockMascota._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMascota);
  });

  it('should call deleteMascota and return a success message', () => {
    service.deleteMascota(mockMascota._id).subscribe((res) => {
      expect(res).toEqual({ message: 'Mascota eliminada con éxito' });
    });

    const req = httpTestingController.expectOne(`${URL_MASCOTAS}/${mockMascota._id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Mascota eliminada con éxito' });
  });
});
