import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { PresupuestosComponent } from '../presupuestos/presupuestos.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css'
})
export class PrintComponent implements OnChanges {
  @Input() precioFinal: number = 0;
  @Input() precioPresupuestado: string | number = '';
  constructor(private changeDetectorRef: ChangeDetectorRef) {} 
  @Input() userData: any;
  @Input() presupuestos: any[] = [];

  printedPresupuestos: any[] = []; // Propiedad para almacenar los presupuestos impresos

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['presupuestos'] && changes['presupuestos'].currentValue) {
      // Reemplazar el array de presupuestos
      this.printedPresupuestos = changes['presupuestos'].currentValue;
      console.log('Nuevos presupuestos recibidos:', this.printedPresupuestos);
      this.changeDetectorRef.detectChanges(); // Detectar cambios para actualizar la vista
    }

    if (changes['precioFinal'] && typeof changes['precioFinal'].currentValue === 'number') {
      // Se ha recibido un nuevo valor para el precio final
      console.log('Nuevo precio final recibido:', changes['precioFinal'].currentValue);
    }
  }
}
