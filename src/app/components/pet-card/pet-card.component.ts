import { Component } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Mascotas } from '../../interfaces/mascotas';
import {NgFor} from '@angular/common';


@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [],
  templateUrl: './pet-card.component.html',
  styleUrl: './pet-card.component.css'
})
export class PetCardComponent {
  _mascotasServices = inject ( MascotasService);
  __toastrService = inject(ToastrService);

  allMascotas : Mascotas[]= [];

  // peticion Get

  obtenerMascotas (){
    this. _mascotasServices.getMascotas().subscribe ({

      next: (res: any) => {
        // acá es cuando todo salió bien
        this.allMascotas = res.datos;
        console.log(this.allMascotas);

      },
      error: (error : any) => {
        // acá es cuando algo salió mal
        console.log(error);
      }

    }
  );
}

// Si yo quiero que se muestre al cargar el contenido de mi página -> debemos usar un método que se llama -> ngOnInit()
ngOnInit(){
  this.obtenerMascotas();
}

// respuesta de la petición POST
crearMascotas(){
  // Lógica para obtener la respuesta
}
// respuesta de la petición PUT
actualizarMacotas(){
  // Lógica para obtener la respuesta
}
// respuesta de la petición DELETE
eliminarMascotas(){
  // Lógica para obtener la respuesta
}

    }
  







