import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnChanges {
  @Input() userData: any;
  @Input() precioFinal: number = 0;
  @Input() presupuestos: any[] = [];
  nuevoPrecioFinal: number = 0;
  @Output() presupuestosChanged: EventEmitter<any[]> = new EventEmitter<any[]>(); // Emitir el nuevo array de presupuestos

  printedPresupuestos: any[] = []; // Propiedad para almacenar los presupuestos impresos

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['presupuestos'] && changes['presupuestos'].currentValue) {
      // Reemplazar el array de presupuestos
      this.printedPresupuestos = changes['presupuestos'].currentValue;
      console.log('Nuevos presupuestos recibidos:', this.printedPresupuestos);
      this.changeDetectorRef.detectChanges(); // Detectar cambios para actualizar la vista
    }

    if (changes['precioFinal'] && typeof changes['precioFinal'].currentValue === 'number') {
      // Se ha recibido un nuevo valor para el precio final
      this.nuevoPrecioFinal = changes['precioFinal'].currentValue;
      console.log('Nuevo precio final recibido dos:', this.nuevoPrecioFinal);
    }
  }
}
