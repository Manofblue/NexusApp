import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {


  editar:boolean=false;

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


  usuarios:Usuario[] = [];



  //el servicio nos permite trabajar la información:
  constructor(private usuarioService: UsuarioService,private alertController: AlertController) { }

  async ngOnInit() {

    this.usuarios = await this.usuarioService.getUsuarios();

  }


  toggleFormulario() {
    const mostrarFormulario = this.personaForm.get('tieneVehiculo')?.value;

    if (mostrarFormulario) {
      this.personaForm.get('patente')?.setValidators([Validators.required]);
      this.personaForm.get('marca')?.setValidators([Validators.required]);
      this.personaForm.get('modelo')?.setValidators([Validators.required]);
      this.personaForm.get('color')?.setValidators([Validators.required]);
    } else{
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


  async registrar(){
    if (this.personaForm.valid) {
      const nuevoUsuario = new Usuario(
        this.personaForm.value.fecha_nacimiento ?? '',
        this.personaForm.value.rut ?? '',
        'Usuario', // tipo_usuario
        this.personaForm.value.usuario ?? '',
        this.personaForm.value.contrasena ?? '',
        this.personaForm.value.contrasena_conf ?? '',
        this.personaForm.value.email ?? '',
        this.personaForm.value.patente ?? '',
        this.personaForm.value.marca ?? '',
        this.personaForm.value.modelo ?? '',
        this.personaForm.value.color ?? '',
        this.personaForm.value.tieneVehiculo ?? false
      );
      
      const result = await this.usuarioService.createUsuario(nuevoUsuario);
      if (result) {
        this.showAlert("Registro Exitoso");
        this.usuarios = await this.usuarioService.getUsuarios();
      } else {
        this.showAlert("El usuario ya existe");
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  async buscar(rut_buscar:string){
    
    //this.personaForm.setValue(await this.usuarioService.getUsuario(rut_buscar) );
    //this.cargarUsuario(await this.usuarioService.getUsuario(rut_buscar));
    const usuario=await this.usuarioService.getUsuario(rut_buscar);
    
    if(usuario){
      this.cargarUsuario(usuario);
      this.editar=true;
    }
  }

  public cargarUsuario(usuario: Usuario): void {
    this.personaForm.patchValue({
      fecha_nacimiento: usuario.fecha_nacimiento,
      rut: usuario.rut,
      usuario: usuario.usuario,
      contrasena: usuario.contrasena,
      contrasena_conf: usuario.contrasena_conf,
      email: usuario.email,
      patente: usuario.patente,
      marca: usuario.marca,
      modelo: usuario.modelo,
      color: usuario.color,
      tieneVehiculo: usuario.tieneVehiculo
    });
  }
  

  async modificar(){
    var rut_buscar: string = this.personaForm.controls.rut.value || "";
    if (this.personaForm.valid) {
      const nuevoUsuario = new Usuario(
      this.personaForm.value.rut ?? '',
      'Usuario',
      this.personaForm.value.fecha_nacimiento ?? '',
      this.personaForm.value.usuario ?? '',
      this.personaForm.value.contrasena ?? '',
      this.personaForm.value.contrasena_conf ?? '',
      this.personaForm.value.email ?? '',
      this.personaForm.value.patente ?? '',
      this.personaForm.value.marca ?? '',
      this.personaForm.value.modelo ?? '',
      this.personaForm.value.color ?? '',
      this.personaForm.value.tieneVehiculo ?? false
    );
    
    if(await this.usuarioService.updateUsuario( rut_buscar , nuevoUsuario)){
      this.editar=false;
      this.showAlert("USUARIO MODIFICADO CON ÉXITO!")
    }

    }else{
      this.showAlert("ERROR! USUARIO NO MODIFICADO!")
    }
  }

  async eliminar(rut_eliminar:string){
    //console.log(rut_eliminar);
    if(await this.usuarioService.deleteUsuario(rut_eliminar) ){
      this.showAlert("USUARIO ELIMINADO CON ÉXITO!")
    }else{
      this.showAlert("ERROR! USUARIO NO ELIMINADO!")
    }
  }

  /**
   * limpiar
   */
  public limpiar():void{
    this.personaForm.reset();
    this.editar=false;
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
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
