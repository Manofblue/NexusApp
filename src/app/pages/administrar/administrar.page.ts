import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.page.html',
  styleUrls: ['./administrar.page.scss'],
})
export class AdministrarPage implements OnInit {


  editar:boolean=false;

  personaForm = new FormGroup({
    fecha_nacimiento: new FormControl( '', [Validators.required]),
    rut: new FormControl('',[Validators.required]),
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

  
  usuarios:any[] = [];

  //el servicio nos permite trabajar la información:
  constructor(private usuarioService: UsuarioService,private alertController: AlertController) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.getUsuarios();
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


  registrar(){
    if( this.usuarioService.createUsuario(this.personaForm.value) ){
      this.showAlert("USUARIO CREADO CON ÉXITO!");
      this.personaForm.reset();
    }else{
      this.showAlert("ERROR! NO SE PUDO CREAR EL USUARIO!")
    }
  }

  buscar(rut_buscar:string){
    this.personaForm.setValue( this.usuarioService.getUsuario(rut_buscar) );
    this.editar=true;
  }

  modificar(){
    var rut_buscar: string = this.personaForm.controls.rut.value || "";
    if(this.usuarioService.updateUsuario( rut_buscar , this.personaForm.value)){
      this.editar=false;
      this.showAlert("USUARIO MODIFICADO CON ÉXITO!")
    }else{
      this.showAlert("ERROR! USUARIO NO MODIFICADO!")
    }
  }

  eliminar(rut_eliminar:string){
    //console.log(rut_eliminar);
    if( this.usuarioService.deleteUsuario(rut_eliminar) ){
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