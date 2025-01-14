import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-usuarios',
  imports: [RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  loginService = inject(LoginService);
  
loginout(){
  this.loginService.cierreSesion()
  
  }


 }

