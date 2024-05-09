import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { CommonModule } from '@angular/common';
import { PresupuestoService } from '../services/presupuesto.service';
import { PresupuestosComponent } from '../presupuestos/presupuestos.component';
import { PrintComponent } from '../print/print.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, PanelComponent, CommonModule, PresupuestosComponent, PrintComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

  
 
})

export class HomeComponent {
  numeroDePaginas: number = 1;
  numeroDeIdiomas: number = 1;
  precioTotal: number = 0;
  precioFinal: number = 0;

  @Output() precioFinalChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private presupuestoService: PresupuestoService, private cdr: ChangeDetectorRef) {}

  onOpcionesWebChange(event: { numeroDePaginas: number, numeroDeIdiomas: number }) {
    this.numeroDePaginas = event.numeroDePaginas;
    this.numeroDeIdiomas = event.numeroDeIdiomas;
    this.actualizarPrecioFinal();
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

  calcularPrecioTotal(): number {
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

  calcularPrecioFinal(): number {
    return this.formulario.get('Web')?.value ?
      (this.numeroDeIdiomas * this.numeroDePaginas * 30) + this.calcularPrecioTotal() :
      this.precioTotal;
  }

  emitirPrecioFinal(): void {
    if (this.precioFinal !== this.calcularPrecioFinal()) {
      this.precioFinal = this.calcularPrecioFinal();
      console.log('Precio final emitido desde HomeComponent:', this.precioFinal);
      this.precioFinalChange.emit(this.precioFinal);
    }
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
    this.actualizarPrecioFinal();
  }

  showInput: boolean = false;

  private actualizarPrecioFinal() {
    this.emitirPrecioFinal();
  }
}





