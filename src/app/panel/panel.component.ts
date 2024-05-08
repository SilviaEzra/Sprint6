
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Input, Output, EventEmitter, Inject } from '@angular/core';
import { PresupuestoService } from '../services/presupuesto.service'; // Import PresupuestoService
import { HomeComponent } from '../home/home.component';

interface OpcionesWeb {
  numeroDePaginas: number;
  numeroDeIdiomas: number;
}

@Component({
  selector: 'app-panel', // Usa un selector único
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  standalone: true, // Declara como independiente

  imports: [
    CommonModule, // Importar CommonModule para directivas comunes
    FormsModule,
    HomeComponent
     // Importar FormsModule para formularios reactivos
  ],
})
export class PanelComponent {
  @Input() isVisible: boolean = false;
  precioTotal: number = 0
  @Output() opcionesWebChange = new EventEmitter<{ numeroDePaginas: number, numeroDeIdiomas: number }>();
  opcionesWeb: OpcionesWeb = {
    numeroDePaginas: 1,
    numeroDeIdiomas: 1,
  };
  showModal = false;
  constructor(private presupuestoService: PresupuestoService,
              @Inject(HomeComponent) private home: HomeComponent) {
   /*  this.precioTotal = this.presupuestoService.calcularPresupuestoTotal(this.opcionesWeb.numeroDePaginas, this.opcionesWeb.numeroDeIdiomas);
    */
  }

  calcularPresupuestoTotal(): void {
  /*  /*  return this.presupuestoService.calcularPresupuestoTotal(this.opcionesWeb.numeroDePaginas, this.opcionesWeb.numeroDeIdiomas); */
  } 

  actualizarOpcionesWeb(): void {
    this.opcionesWebChange.emit(this.opcionesWeb);
    this.actualizarPrecioTotal();
  }

  sumarPagina(): void {
    this.opcionesWeb.numeroDePaginas++;
    this.actualizarOpcionesWeb();
  }

  restarPagina(): void {
    if (this.opcionesWeb.numeroDePaginas > 1) {
      this.opcionesWeb.numeroDePaginas--;
      this.actualizarOpcionesWeb();
    }
  }

  sumarIdioma(): void {
    this.opcionesWeb.numeroDeIdiomas++;
    this.actualizarOpcionesWeb();
  }

  restarIdioma(): void {
    if (this.opcionesWeb.numeroDeIdiomas > 1) {
      this.opcionesWeb.numeroDeIdiomas--;
      this.actualizarOpcionesWeb();
    }
  }

  private actualizarPrecioTotal() {
    /* this.precioTotal = this.presupuestoService.calcularPresupuestoTotal(this.opcionesWeb.numeroDePaginas, this.opcionesWeb.numeroDeIdiomas); */
  }
 
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  // Métodos para incrementar y decrementar el número de páginas e idiomas
  // ...

  
}

    
  


