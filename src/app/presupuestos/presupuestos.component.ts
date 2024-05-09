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
  
 @Output() presupuestosChanged = new EventEmitter<any[]>();
 @Input()precioFinal: number = 0;
 onPresupuestosChanged(nuevosPresupuestos: any[]) {
  this.presupuestos = nuevosPresupuestos;
}


  constructor() {}

  onSubmit() {
    if (this.formUser.valid) {
      // Llama a printTotal con el precio final
      this.printTotal(this.precioFinal);
      this.showPrintComponent = true;
      console.log(this.precioFinal)
    }
  }

  printTotal(precioFinal: number) {
  if (this.formUser.valid) {
    // Agregar el presupuesto al array
    const nuevoPresupuesto = {
      nombre: this.name.value,
      email: this.mail.value,
      telefono: this.telf.value,
      precio: this.precioFinal
    };
    this.presupuestos.push(nuevoPresupuesto);
    console.log(precioFinal);
    
    // Emitir el evento con el nuevo array de presupuestos
    this.presupuestosChanged.emit([...this.presupuestos]); // Crear una copia del array para evitar mutaciones inesperadas
  }
}
}