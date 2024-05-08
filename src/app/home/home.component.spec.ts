import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { HomeComponent } from './home.component';
import { PresupuestosComponent } from '../presupuestos/presupuestos.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, PresupuestosComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [ChangeDetectorRef]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit precioFinalChange event', () => {
    spyOn(component.precioFinalChange, 'emit');
    component.emitirPrecioFinal();
    expect(component.precioFinalChange.emit).toHaveBeenCalled();
  });

  it('should calculate precio final', () => {
    component.formulario = new FormGroup({
      "Seo": new FormControl(true),
      "Ads": new FormControl(false),
      "Web": new FormControl(true)
    });
    component.numeroDePaginas = 2;
    component.numeroDeIdiomas = 3;
    const precioFinal = component.calcularPrecioFinal();
    expect(precioFinal).toEqual(2 * 3 * 30 + component.precios['Seo'] + component.precios['Web']);
  });

  // Agrega más pruebas según sea necesario
});
