import { Component, inject } from '@angular/core';
import { MascotasService } from '../../services/mascotas.service';
import { Mascotas } from '../../interfaces/mascotas';
import { ToastrService } from 'ngx-toastr';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-dash-board',
  imports: [ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})

export class DashboardComponent {


mascotasService = inject(MascotasService);
toastrService = inject(ToastrService);
loginService = inject(LoginService);

allMacotas: Mascotas[] = [];

obtenerMascotas (){
  this.mascotasService.getMascotas().subscribe ({

    next: (res: any) => {
      // acá es cuando todo salió bien
       this.allMacotas= res.mascotas;
      console.log(this.allMacotas);
    },
    error: (error : any) => {
      // acá es cuando algo salió mal
      console.log(error) 
      this.toastrService.error("ocurrio un error al mostrar mascotas");
      
      ;
    }

  }
);
}
  addMascota() {
    console.log('Añadir producto'); // aqui poner logica --- crear formulario de mascota
    // Lógica para añadir un producto
  }

  editMascota(productId: string) { // aqui poner logica --- crear formulario para editar mascotas con la info requerida
    console.log(`Editar producto con ID: ${productId}`);
    // Lógica para editar un producto
  }

  deleteMascota(productId: string) { // aqui poner logica 
    console.log(`Eliminar producto con ID: ${productId}`);
    // Lógica para eliminar un producto
  }

loginout(){
this.loginService.cierreSesion()


}


// Si yo quiero que se muestre al cargar el contenido de mi página -> debemos usar un método que se llama -> ngOnInit()
ngOnInit(){
  this.obtenerMascotas();
  }
}


