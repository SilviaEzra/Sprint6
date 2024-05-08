import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

paginas : number = 0
idiomas : number = 0

  constructor() { }

  
 /*  private readonly precioPorPagina = 30; // Precio por página
  private readonly precioPorIdioma = 30; // Precio por idioma

  calcularPresupuestoTotal(numeroDePaginas: number, numeroDeIdiomas: number): number {
    // Usa los valores constantes directamente en el cálculo
    return numeroDePaginas * this.precioPorPagina + numeroDeIdiomas * this.precioPorIdioma;
  } */

  recibeInfo(paginas: number, idiomas: number){
    this.paginas = paginas
    this.idiomas = idiomas
  }
}






