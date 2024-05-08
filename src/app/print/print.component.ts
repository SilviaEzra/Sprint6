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
  constructor(private changeDetectorRef: ChangeDetectorRef) {} 
  @Input() userData: any;
  @Input() presupuestos: any[] = [];

  printedPresupuestos: any[] = []; // Propiedad para almacenar los presupuestos impresos

  ngOnChanges(changes: SimpleChanges): void {
  if (changes['presupuestos'] && changes['presupuestos'].currentValue) {
    const newPresupuestos = changes['presupuestos'].currentValue;
    this.printedPresupuestos = [...this.printedPresupuestos, ...newPresupuestos]; // Agregar nuevos presupuestos al array
    console.log('Nuevos presupuestos recibidos:', newPresupuestos);
    this.changeDetectorRef.detectChanges(); // Detectar cambios para actualizar la vista
  }
}
  }
