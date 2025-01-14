import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BannerComponent } from "../../components/banner/banner.component";
@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
  imports: [NavBarComponent, FooterComponent, BannerComponent]
})
export class ContactanosComponent {
  constructor() { }
}
