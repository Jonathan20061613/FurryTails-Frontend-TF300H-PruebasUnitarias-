import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // 1. Inyectar dependencias y servicios
  const _loginService = inject(LoginService);
  const _router = inject(Router);

  if(!_loginService.estaLogueado()){
    _router.navigate(['/login']);
    return false;
  }

  if(!_loginService.esAdmin()){
    _router.navigate(['/']);
    return false;
  }
  
  return true;
};