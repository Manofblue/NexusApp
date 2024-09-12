import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  mostrarFormulario=false;

  personaForm =new FormGroup({
    fecha_nacimiento: new FormControl( '', [Validators.required]),
    usuario:new FormControl( '', [Validators.required, Validators.minLength(1)]),
    contrasena:new FormControl( '', [Validators.required, Validators.minLength(1)]),
    contrasena_conf:new FormControl( '', [Validators.required, Validators.minLength(1)]),
    email: new FormControl('', [Validators.required]),
    patente:new FormControl('', []),
    marca: new FormControl('',[]),
    modelo:new FormControl('', []),
    color:new FormControl('', []),
    tieneVehiculo: new FormControl(false) 

  });

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  constructor(private fb: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    console.log('Formulario inicial:', this.personaForm.value);
  }

  toggleFormulario() {
    const mostrarFormulario = this.personaForm.get('tieneVehiculo')?.value;

    if (mostrarFormulario) {
      this.personaForm.get('patente')?.setValidators([Validators.required]);
      this.personaForm.get('marca')?.setValidators([Validators.required]);
      this.personaForm.get('modelo')?.setValidators([Validators.required]);
      this.personaForm.get('color')?.setValidators([Validators.required]);
    } else {
      this.personaForm.get('patente')?.clearValidators();
      this.personaForm.get('marca')?.clearValidators();
      this.personaForm.get('modelo')?.clearValidators();
      this.personaForm.get('color')?.clearValidators();
    }

    this.personaForm.get('patente')?.updateValueAndValidity();
    this.personaForm.get('marca')?.updateValueAndValidity();
    this.personaForm.get('modelo')?.updateValueAndValidity();
    this.personaForm.get('color')?.updateValueAndValidity();
  }

  registrar(): void {
    console.log('Formulario antes de enviar:', this.personaForm.value);
    console.log('Formulario inválido:', this.personaForm.invalid);
    if (this.personaForm.valid) {
      console.log(this.personaForm.value);
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario no válido');
    }
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }
}

// Función de validador personalizada
export function passwordMatchValidator(): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
    const password = formGroup.get('contrasena');
    const confirmPassword = formGroup.get('contrasena_conf');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  };
}
