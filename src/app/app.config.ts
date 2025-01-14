import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    //Proveedores que necesitan Funcionamiento
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Proveedor permite peticiones al backend
    provideHttpClient(withInterceptors([authInterceptor])),
    //Proveedor para mensajes
    provideToastr({
      timeOut: 2000, //tiempo de duracion en pantallaz
      positionClass: 'toast-bottom-left', // definir donde se muestre
      preventDuplicates: true, // evitar duplicados
      easeTime: 0, //Cuanto tiempo pasa antes de que aparesca en pantalla
      progressBar: true // si queremos o no la barra de progreso
    }),
    provideAnimations(),
  ]
};
