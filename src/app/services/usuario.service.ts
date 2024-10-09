import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { Storage } from '@ionic/storage-angular';

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
      "usuario": "admin",
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

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    await this.storage.create();
    let admin = new Usuario(
      "1990-01-01",        // fecha_nacimiento
      "12345678-9",       // rut
      "admin",            // tipo_usuario
      "admin",            // usuario
      "123",              // contrasena
      "123",              // contrasena_conf
      "admin@gmail.com",  // email
      "",                 // patente
      "",                 // marca
      "",                 // modelo
      "",                 // color
      false               // tieneVehiculo
    );
    await this.createUsuario(admin);
  }
  

  //aquí vamos a crear toda nuestra lógica de programación
  //DAO:
  public async createUsuario(usuario: Usuario): Promise<boolean> {
    const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
    if (usuarios.find((usu) => usu.rut === usuario.rut) != undefined) {
      return false;
    }
    usuarios.push(usuario);
    await this.storage.set('usuarios', usuarios);
    return true;
  }

  public async getUsuario(rut: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
    return usuarios.find((usu) => usu.rut === rut);
  }

  public async getUsuarios(): Promise<Usuario[]> {
    return (await this.storage.get('usuarios')) || [];
  }

  public async updateUsuario(rut: string, nuevoUsuario: Usuario): Promise<boolean> {
    const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
    const indice = usuarios.findIndex((usu) => usu.rut === rut);
    if (indice === -1) {
      return false;
    }

    usuarios[indice] = nuevoUsuario;
    await this.storage.set('usuarios', usuarios);
    return true;
  }

  public async deleteUsuario(rut: string): Promise<boolean> {
    const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
    const indice = usuarios.findIndex((usu) => usu.rut === rut);
    if (indice === -1) {
      return false;
    }
    usuarios.splice(indice, 1);
    await this.storage.set('usuarios', usuarios);
    return true;
  }

  public async login(correo: string, contrasena: string): Promise<Boolean> {
    const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
    //return usuarios.find((elemento) => elemento.email === correo && elemento.contrasena === contrasena);
    const usuario = usuarios.find((elemento) => elemento.email === correo && elemento.contrasena === contrasena);
    if (usuario) {
      localStorage.clear();
      localStorage.setItem('rol', usuario.tipo_usuario); 
      localStorage.setItem('idUsuario', usuario.rut); 
      return true;
    }
    return false;

  
  }

  public async recuperarUsuario(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
    return usuarios.find((elemento) => elemento.email === correo);
  }



}
