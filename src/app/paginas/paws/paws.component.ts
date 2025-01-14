import { Component, ElementRef, ViewChild } from '@angular/core';
import { Button, Modal } from 'bootstrap';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { PetCardComponent } from "../../components/pet-card/pet-card.component";



@Component({
  selector: 'app-image-gallery',
  templateUrl: './paws.component.html',
  styleUrls: ['./paws.component.css'],
  imports: [NavBarComponent, FooterComponent, CommonModule]
})
export class PawsComponent {
  @ViewChild('imageModal') imageModal: any;
  @ViewChild('closebutton') closebutton:any;



  // Array de imágenes con título y contenido
  images = [
    {
      src: 'assets/pawsAssets/contenedorLucas.png',
      src2:'assets/pawsAssets/imagenGato3.jpg',
      title: 'Lucas',
      content: 'Conoce a Lucas, es un hermoso gatito lleno de ternura y curiosidad, su pelaje es suave y de color gris',
      content2: 'Esta vacunado, desparacitado y esterilizado. Busca un hogar lleno de amor donde pueda dar todo su cariño, si estas interesado en darle una segunda oportunidad y mucho amor. !contactanos¡',
      name:'Lucas',
      age:'3',
      Breed:'turkish',
      size:'mediano',
      gender:'macho',
      adopt:false
    },
    {
      src: 'assets/pawsAssets/contenedorLuna.png',
      src2:'assets/pawsAssets/imagenGato2.jpg',
      title: 'Luna',
      content: 'Conoce a luna, es un hermoso gatito lleno de ternura y curiosidad, su pelaje es suave y de color gris',
      content2: 'Esta vacunado, desparacitado y esterilizado. Busca un hogar lleno de amor donde pueda dar todo su cariño, si estas interesado en darle una segunda oportunidad y mucho amor. !contactanos¡',
      name:'luna',
      age:'3',
      race:'turkish',
      size:'mediano',
      gender:'macho',
      adopt:false
    },
    {
      src: 'assets/pawsAssets/contenedorTequila.png',
      src2:'assets/pawsAssets/imagenPerrito.jpg',
      title: 'Tequila',
      content: 'Conoce a tequila, es un hermoso gatito lleno de ternura y curiosidad, su pelaje es suave y de color gris',
      content2: 'Esta vacunado, desparacitado y esterilizado. Busca un hogar lleno de amor donde pueda dar todo su cariño, si estas interesado en darle una segunda oportunidad y mucho amor. !contactanos¡',
      name:'Tequila',
      age:'3',
      race:'turkish',
      size:'mediano',
      gender:'macho',
      adopt:false
    },
    {
      src: 'assets/pawsAssets/contenedorWiskey.png',
      src2:'assets/pawsAssets/imagenGatito.png',
      title: 'whisky',
      content: 'Conoce a whisky, es un hermoso gatito lleno de ternura y curiosidad, su pelaje es suave y de color gris',
      content2: 'Esta vacunado, desparacitado y esterilizado. Busca un hogar lleno de amor donde pueda dar todo su cariño, si estas interesado en darle una segunda oportunidad y mucho amor. !contactanos¡',
      name:'whisky',
      age:'3',
      race:'turkish',
      size:'mediano',
      gender:'macho',
      adopt:false
    },
    {
      src: 'assets/pawsAssets/Ginebra.png',
      src2:'assets/pawsAssets/imagenGinebra.png',
      title: 'Ginebra',
      content: 'Conoce a ginebra, es un hermoso gatito lleno de ternura y curiosidad, su pelaje es suave y de color gris',
      content2: 'Esta vacunado, desparacitado y esterilizado. Busca un hogar lleno de amor donde pueda dar todo su cariño, si estas interesado en darle una segunda oportunidad y mucho amor. !contactanos¡',
      name:'ginebra',
      age:'3',
      race:'turkish',
      size:'mediano',
      gender:'macho',
      adopt:false
    },
    {
      src: 'assets/pawsAssets/contenedorLucas.png',
      src2:'assets/pawsAssets/imagenGato3.jpg',
      title: 'Lucas',
      content: 'Conoce a Lucas, es un hermoso gatito lleno de ternura y curiosidad, su pelaje es suave y de color gris',
      content2: 'Esta vacunado, desparacitado y esterilizado. Busca un hogar lleno de amor donde pueda dar todo su cariño, si estas interesado en darle una segunda oportunidad y mucho amor. !contactanos¡',
      name:'Lucas',
      age:'3',
      race:'turkish',
      size:'mediano',
      gender:'macho',
      adopt:false
    },
  ];

  // Datos del modal
  modalData = {
    src2:'',
    title: '',
    content: '',
    content2: '',
    name:'',
    age:'',
    race:'',
    size:'',
    gender:'',
    adopt:false
  };

  // Abre el modal y asigna los datos
  openModal(image: any) {
    this.modalData.src2 = image.src2;
    this.modalData.title = image.title;
    this.modalData.content = image.content;
    this.modalData.content2 = image.content2;
    this.modalData.name = image.name;
    this.modalData.age = image.age;
    this.modalData.size = image.size;
    this.modalData.race = image.race; 
    this.modalData.gender = image.gender;
    this.modalData.adopt = image.adopt;

    // Referencia al modal de Bootstrap
    const modal = new Modal(this.imageModal.nativeElement);
    modal.show();
  }
  adopt(){
    console.log("entra", this.modalData)
    const adoptedImage = this.images.find(image => image.name === this.modalData.name);
    if (adoptedImage) {
      adoptedImage.adopt = true; // Cambia el estado de adoptado a true
      console.log("adoptedImage",adoptedImage)
    }
    /* const modal = new Modal(this.imageModal.nativeElement);
    modal.hide(); */
    // Mostrar la alerta
    alert('¡Que bien que tomaste la decision de adoptar, nos contactaremos contigo!');
  }
}
