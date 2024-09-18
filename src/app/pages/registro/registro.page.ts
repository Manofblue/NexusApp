import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  mostrarFormulario=false;

  personaForm =new FormGroup({
    fecha_nacimiento: new FormControl( '', [Validators.required, edadValidacion(18)]),
    rut: new FormControl('',[Validators.required,Validators.pattern("[0-9]{7,8}-[0-9kK]{1}")]),
    usuario:new FormControl( '', [Validators.required, Validators.minLength(6)]),
    contrasena:new FormControl( '', [Validators.required, Validators.minLength(3)]),
    contrasena_conf:new FormControl( '', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    patente:new FormControl('', []),
    marca: new FormControl('',[]),
    modelo:new FormControl('', []),
    color:new FormControl('', []),
    tieneVehiculo: new FormControl(false) 

  }, { validators: passwordMatchValidator() }); 


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

  usuarios:any[] = [];

  constructor(private fb: FormBuilder, private router: Router,private alertController: AlertController,private usuarioService: UsuarioService) {

  }
  ngOnInit() {
    this.usuarios = this.usuarioService.getUsuarios();
  }

  toggleFormulario() {
    const mostrarFormulario = this.personaForm.get('tieneVehiculo')?.value;

    if (mostrarFormulario) {
      this.personaForm.get('patente')?.setValidators([Validators.required]);
      this.personaForm.get('marca')?.setValidators([Validators.required,Validators.minLength(3)]);
      this.personaForm.get('modelo')?.setValidators([Validators.required,Validators.minLength(3)]);
      this.personaForm.get('color')?.setValidators([Validators.required,Validators.minLength(3)]);
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

    if (this.personaForm.valid) {
      this.usuarioService.createUsuario(this.personaForm.value);
      //console.log(this.personaForm.value);
      this.showAlert("Registro Exitoso")
      this.router.navigate(['/login']);
    } else {
      console.log('Formulario no válido');
    }
  }

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}




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

  export function edadValidacion(edadMinima: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const birthDate = new Date(control.value);
      if (!birthDate.getTime()) {
        return null; // Si no es una fecha válida
      }
      
      const age = new Date().getFullYear() - birthDate.getFullYear();
      const monthDifference = new Date().getMonth() - birthDate.getMonth();
      
      // Si no ha cumplido años este año, resta uno
      if (monthDifference < 0 || (monthDifference === 0 && new Date() < birthDate)) {
        return age < edadMinima ? { 'edadInvalida': true } : null;
      }
  
      return age < edadMinima ? { 'edadInvalida': true } : null;
    };
}
