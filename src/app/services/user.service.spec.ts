import { TestBed } from '@angular/core/testing';
import { UsuariosService } from './user.service';
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { User } from '../interfaces/user';

describe('Pruebas para UsuariosService', () => {
  let service: UsuariosService;
  let mockHttp: HttpTestingController;
  const UrlCrear = 'http://localhost:3000/usuarios/crear';
  const UrlObtener = "http://localhost:3000/usuarios/obtener";
  const UrlActualizar = "http://localhost:3000/usuarios/actualizar/";
  const UrlEliminar = "http://localhost:3000/usuarios/eliminar/";
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsuariosService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(UsuariosService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  // Prueba para petición GET
  it('debería hacer una petición GET para obtener usuarios', () => {
    const mockUsers = [
      { fullName: "John Doe", email: "johndoe@gmail.com", password: "123", phone: "123456789", isAdult: "yes", address: "123 Street" },
      { fullName: "Jane Doe", email: "janedoe@gmail.com", password: "123", phone: "987654321", isAdult: "yes", address: "456 Avenue" }
    ];
    const mockResponse = {
      mensaje: "Se encontraron usuarios almacenados",
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    };

    service.getUsuarios().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = mockHttp.expectOne(UrlObtener);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  // Prueba para petición POST
  it('debería hacer una petición POST para crear un usuario', () => {
    const mockUser: User = {
      fullName: "New User",
      email: "newuser@gmail.com",
      password: "securepassword",
      phone: "123456789",
      isAdult: "yes",
      address: "789 Boulevard"
    };

    const mockResponse = {
      mensaje: "Usuario creado correctamente",
      datos: mockUser
    };

    service.postUsuarios(mockUser).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = mockHttp.expectOne(UrlCrear);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });

  // Prueba para petición PUT
  it('debería hacer una petición PUT para actualizar un usuario', () => {
    const userId = '123456';
    const mockUpdatedUser: User = {
      fullName: "Updated User",
      email: "updateduser@gmail.com",
      password: "newpassword",
      phone: "123456789",
      isAdult: "yes",
      address: "Updated Address"
    };

    const mockResponse = {
      mensaje: "Usuario actualizado correctamente"
    };

    service.putUsuarios(mockUpdatedUser, userId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = mockHttp.expectOne(UrlActualizar + userId);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUpdatedUser);
    req.flush(mockResponse);
  });

  // Prueba para petición DELETE
  it('debería hacer una petición DELETE para eliminar un usuario', () => {
    const userId = '123456';
    const mockResponse = {
      mensaje: "Usuario eliminado exitosamente"
    };

    service.deleteUsuarios(userId).subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = mockHttp.expectOne(UrlEliminar + userId);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});