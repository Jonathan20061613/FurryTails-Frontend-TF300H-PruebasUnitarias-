import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet.form.component.html',
  styleUrls: ['./pet.form.component.css']
})
export class PetFormComponent {
  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Formulario enviado');
  }
}
