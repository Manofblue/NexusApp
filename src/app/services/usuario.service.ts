import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //acá podemos crear variables:

  usuarios: any[] = [
    {
      "rut": 12345678,
      "nombre": "usuario1",
      "tipo_usuario": "admin",
      "fecha_nacimiento": "1990-01-01",
      "usuario": "usuario1",
      "contrasena": "1",
      "contrasena_conf": "1",
      "email": "usuario1@example.com",
      "patente": "ABC123",
      "marca": "MarcaEjemplo",
      "modelo": "ModeloEjemplo",
      "color": "Rojo",
      "tieneVehiculo": true
    }
  ];

  constructor() { }

  //aquí vamos a crear toda nuestra lógica de programación
  //DAO:
  public createUsuario(usuario:any):boolean{
    if( this.getUsuario(usuario.rut)==undefined ){
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  public getUsuario(rut:string){
    return this.usuarios.find(elemento=> elemento.rut == rut);
  }

  public getUsuarios():any[]{
    return this.usuarios;
  }

  public updateUsuario(rut:string, nuevoUsuario:any){
    const indice = this.usuarios.findIndex(elemento => elemento.rut==rut);
    if(indice==-1){
      return false;
    }
    this.usuarios[indice] = nuevoUsuario;
    return true;
  }

  public deleteUsuario(rut:string):boolean{
    const indice = this.usuarios.findIndex(elemento => elemento.rut==rut);
    if(indice==-1){
      return false;
    }
    this.usuarios.splice(indice,1);
    return true;
  }

}
