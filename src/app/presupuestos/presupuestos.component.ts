import { Component, Output,Input, EventEmitter } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrintComponent } from '../print/print.component';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-presupuestos',
  standalone: true,
  imports: [PanelComponent, ReactiveFormsModule,CommonModule, PrintComponent, HomeComponent],
  templateUrl: './presupuestos.component.html',
  styleUrl: './presupuestos.component.css'
})



export class PresupuestosComponent {

  presupuestos: any[] = []; 

  get name(){
    return this.formUser.get('name') as FormControl
  }

  get mail(){
    return this.formUser.get('mail') as FormControl
  }

  get telf(){
    return this.formUser.get('telf') as FormControl
  }

  formUser= new FormGroup({
    'name': new FormControl('', Validators.required),
    'mail' : new FormControl('', [Validators.required, Validators.email]),
    'telf' : new FormControl('', Validators.required)
  })

  /*name = new FormControl('', Validators.required);
  mail = new FormControl('', [Validators.required, Validators.email]);*/
  
  showPrintComponent = false;
  
  
 precioFinal: number = 0;

 constructor() {}

  
 manejarPrecioFinalChange(precioFinal: number) {
  console.log('Precio final recibido en PresupuestosComponent:', precioFinal);
  this.precioFinal = precioFinal; // Actualizamos el precio final
}

@Output() printData = new EventEmitter<any>(); // Event to emit data
   // Array para almacenar los presupuestos

  onSubmit() {
    if (this.formUser.valid) {
      // Agregar el presupuesto al array
      this.presupuestos.push({
        nombre: this.name.value,
        email: this.mail.value,
        telefono: this.telf.value,
        precioFinal: this.precioFinal
      });
      this.showPrintComponent = true;
    }
  }

  

  printTotal() {
    const total = this.precioFinal;
    
    // Agregar el nuevo presupuesto al array de presupuestos
    this.presupuestos.push({
      nombre: this.name.value,
      email: this.mail.value,
      telefono: this.telf.value,
      precioFinal: total
    });
 

}}
