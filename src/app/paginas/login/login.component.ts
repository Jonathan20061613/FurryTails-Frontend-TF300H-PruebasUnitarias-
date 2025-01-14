import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CredencialesUser } from '../../interfaces/credenciales-user';
import { CredencialesAdmin } from '../../interfaces/credenciales-admin';
import { ToastrService } from 'ngx-toastr';

// Aqui debemos
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component";

//import { FormsModule } from '@angular/forms'; Se usa en plantillas pero no te permiten conectar la base de datos
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
// los formularios reactivos trabajan de forma dinamica y me permiten acceder a la base de datos
// 1. injección de dependencias
_loginService = inject(LoginService);
_toastrService = inject(ToastrService);

password: string = '';
showPassword: boolean = false;



/*
  trabajan con grupo de formularios  y tienen un grupo de controles
*/

formularioLogin = new FormGroup({
email: new FormControl(""),
password: new FormControl(""),
});

// esta funcion nos permite controla lo que pasa con nuestro formulario al usar el boton submit
loginUser(){
  // se muestra en consola  la info que estamos recibiendo

  const emailLogin = this.formularioLogin.value.email ;
  const passwordLogin = this.formularioLogin.value.password;
  let Credencialesingreso: CredencialesUser| null = null ;
  if(typeof emailLogin === 'string' && typeof passwordLogin === 'string'){
    // nos creamos una interfaz de tipo Credentials
    Credencialesingreso = {
      emailLogin,
      passwordLogin
    }
  }
  if(Credencialesingreso){
    this._loginService.inicioSesionUser(Credencialesingreso).subscribe({
      // manejar los errores en el front
      next: (res: any) => {
        // acá cuanto todo Ok -> 200
        console.log(res)
        if(res){
          localStorage.setItem('token', res.tokenGenerado)
          this._loginService.redireccionar();
        }

      },
      // acá es cuando hay un error o un estado diferente al 200
      error: (err)=>{
        console.log(err.error.mensaje);
        this._toastrService.error(err.error.mensaje || 'Ocurrió un error al iniciar sesión');
        this.formularioLogin.reset();
      }
    })
  }
}


loginAdmin(){
  // se muestra en consola  l
  const emailLogin = this.formularioLogin.value.email ;
  const passwordLogin = this.formularioLogin.value.password;
  let Credencialesingreso: CredencialesAdmin | null = null ;
  if(typeof emailLogin === 'string' && typeof passwordLogin === 'string'){
    // nos creamos una interfaz de tipo Credentials
    Credencialesingreso = {
      emailLogin,
      passwordLogin
    }
  }
  if(Credencialesingreso){
    this._loginService.inicioSesionAdmin(Credencialesingreso).subscribe({
      // manejar los errores en el front
      next: (res: any) => {
        // acá cuanto todo Ok -> 200
        console.log(res)
        if(res){
          localStorage.setItem('token', res.tokenGenerado)
          this._loginService.redireccionar();
        }

      },
      // acá es cuando hay un error o un estado diferente al 200
      error: (err)=>{
        console.log(err.error.mensaje);
        this._toastrService.error(err.error.mensaje || 'Ocurrió un error al iniciar sesión');
        this.formularioLogin.reset();
      }
    })
  }
}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}


