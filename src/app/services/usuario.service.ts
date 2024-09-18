import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //acá podemos crear variables:

  usuarios: any[] = [
    {
      "rut": "12345678-9",
      "nombre": "admin",
      "tipo_usuario": "admin",
      "fecha_nacimiento": "1990-01-01",
      "usuario": "usuario1",
      "contrasena": "123",
      "contrasena_conf": "123",
      "email": "admin@gmail.com",
      "patente": "",
      "marca": "",
      "modelo": "",
      "color": "",
      "tieneVehiculo": false
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

  /**
   * login
 :boolean  */
 public login(email: string, contrasena: string): boolean {

  const usuario = this.usuarios.find(u => u.email === email && u.contrasena === contrasena);
  if (usuario) {
    // Guarda el rol del usuario en algún lugar, como en un servicio de sesión
    localStorage.setItem('rol', usuario.tipo_usuario); // Aquí guardas el rol en localStorage
    return true;
  }
  return false;

  }

}
