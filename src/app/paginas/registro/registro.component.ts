import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";
import { UsuariosService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, FooterComponent, NavBarComponent],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  // Inyección de dependencias
  _usuarioService = inject(UsuariosService);
  _toastrService = inject(ToastrService);
  _router = inject(Router);


  formularioRegistro = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    isAdult: new FormControl(''),
    address: new FormControl(''),

  });

  onSubmit() {

    const fullName = this.formularioRegistro.value.fullName;
    const email = this.formularioRegistro.value.email;
    const password = this.formularioRegistro.value.password;
    const phone = this.formularioRegistro.value.phone;
    const isAdult = this.formularioRegistro.value.isAdult;
    const address = this.formularioRegistro.value.address;
    

    let nuevoUsuario: User | null = null;
    if (typeof fullName === 'string' && typeof email === 'string' && typeof password === 'string' && typeof phone === 'string' && typeof isAdult === 'string' && typeof address === 'string') {
      // nos creamos una interfaz de tipo Credentials
      nuevoUsuario = {
        fullName,
        email,
        password,
        phone,
        isAdult,
        address,

      }
    }

    console.log(nuevoUsuario);

    this._usuarioService.postUsuarios(nuevoUsuario).subscribe({

     // respuesta exitosa
     next: (res: any) => {
       console.log('Respuesta exitosa:', res);
    
         this._toastrService.success('Usuario registrado exitosamente', 'Registro');
         this._router.navigate(['/']); // Redirige al inicio
     },
      // error
     error: (err: any) => {
         console.log('Error al registrar usuario:', err.error.mensaje);
       this._toastrService.error(err.error.mensaje || 'Ocurrió un error al registrar el usuario');
        this.formularioRegistro.reset(); // Resetea el formulario
     }
     });


  }
}


