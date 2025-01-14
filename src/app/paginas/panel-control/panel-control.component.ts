 import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router'; falta poner routerlink
import { DashboardComponent } from "../../components/dash-board/dash-board.component";

@Component({
  selector: 'app-panel-control',
  imports: [ DashboardComponent],
  templateUrl: './panel-control.component.html',
   styleUrl: './panel-control.component.css'
 })
export class PanelControlComponent {

}
 

