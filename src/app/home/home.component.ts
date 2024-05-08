import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { PresupuestoService } from '../services/presupuesto.service';
import { PresupuestosComponent } from '../presupuestos/presupuestos.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PanelComponent, CommonModule, PresupuestosComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

  
 
})

export class HomeComponent {
  numeroDePaginas:number = 1
  numeroDeIdiomas:number = 1
  precioTotal: number = 0
  @Output() precioFinalChange: EventEmitter<number> = new EventEmitter<number>();

constructor(private presupuestoService: PresupuestoService, private cdr: ChangeDetectorRef, private changeDetectorRef: ChangeDetectorRef) { }
  
onOpcionesWebChange(event: { numeroDePaginas: number, numeroDeIdiomas: number }) {
    // Maneja los datos recibidos, por ejemplo, puedes almacenarlos en variables locales
    this.numeroDePaginas = event.numeroDePaginas;
    this.numeroDeIdiomas = event.numeroDeIdiomas;
    
    
    // Puedes realizar cualquier otra lógica necesaria con estos datos
  }

  formulario = new FormGroup({
    "Seo": new FormControl(false, Validators.requiredTrue),
    "Ads": new FormControl(false, Validators.requiredTrue),
    "Web": new FormControl(false, Validators.requiredTrue)
  });

  precios = {
    "Seo": 300,
    "Ads": 400,
    "Web": 500
  };


  // Inyectar PresupuestoService

  calcularPrecioTotal() {
    let precioTotal = 0;
    
    
    const keys = Object.keys(this.formulario.controls);
    keys.forEach(key => {
      const control = this.formulario.get(key);
      if (control && control.value) {
        precioTotal += this.precios[key as keyof typeof this.precios];
        
      }
    });
    return precioTotal;
  }

  precioFinal(controlName: string): number {
    if (controlName === 'Web') {
      const control = this.formulario.get('Web');
      if (control && control.value) {
        return (this.numeroDeIdiomas * this.numeroDePaginas * 30) + this.calcularPrecioTotal();
      } else {
        return 0; // Retornar 0 si la casilla no está marcada
      }
    } else {
      return this.precioTotal;
    }
  }

  calcularPrecioFinal(): number {
    return this.precioFinal('Web');
  }

  emitirPrecioFinal(): void {
    const precioFinal = this.calcularPrecioFinal();
    console.log('Precio final emitido desde HomeComponent:', precioFinal);
    this.precioFinalChange.emit(precioFinal);
  }


  checkbox(event: any, controlName: string) {
    const control = this.formulario.get(controlName);
    if (control) {
      control.setValue(event.target.checked);
    } 
    this.cdr.detectChanges();
    if (controlName === 'Web') {
      this.showInput = event.target.checked;
    }
  }
 
  showInput: boolean= false;


   
  
  }



 


  








