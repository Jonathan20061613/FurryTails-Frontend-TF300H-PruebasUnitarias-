import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _loginService = inject(LoginService);

  const token = _loginService.obtenerToken();

  const tokenReq = token ?
    req.clone({ setHeaders: {Authorization: 'Bearer ' + token}})
    : req;

  return next(tokenReq);
};
