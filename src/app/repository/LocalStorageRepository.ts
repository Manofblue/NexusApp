// local-storage-repository.ts
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioRepository } from './UsuarioRepository';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepository implements UsuarioRepository {
    
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
      const usuariosRaw: any[] = await this.storage.get('usuarios') || [];
      if (usuariosRaw.length === 0) {
        const admin = new Usuario(
          "1990-01-01", 
          "12345678-9", 
          "admin", 
          "admin", 
          "123", 
          "123", 
          "admin@gmail.com"
        );
        await this.createUsuario(admin);
      }
    }
    
  
    //aquí vamos a crear toda nuestra lógica de programación
    //DAO:
  
    private async crearUsuarios(): Promise<Usuario[]> {
      const usuariosRaw: any[] = (await this.storage.get('usuarios')) || [];
      return this.mapToUsuarios(usuariosRaw);
  }
  
  private mapToUsuarios(usuariosRaw: any[]): Usuario[] {
      return usuariosRaw.map(usu => new Usuario(
          usu.fecha_nacimiento,
          usu.rut,
          usu.tipo_usuario,
          usu.usuario,
          usu.contrasena,
          usu.contrasena_conf,
          usu.email,
          usu.vehiculo
      ));
  }
  
  public async createUsuario(usuario: Usuario): Promise<boolean> {
      const usuarios: Usuario[] = await this.crearUsuarios();
  
      if (usuarios.find((usu) => usu.getRut() === usuario.getRut()  || usu.getEmail()==usuario.getEmail()) != undefined) {
          return false;
      }
  
      usuarios.push(usuario);
      await this.storage.set('usuarios', usuarios);
      return true;
  }
  
  
  
    public async getUsuario(rut: string): Promise<Usuario | undefined> {
      //const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
      const usuarios: Usuario[] = await this.crearUsuarios();
  
      return usuarios.find((usu) => usu.getRut() === rut);
    }
  
    public async getUsuarios(): Promise<Usuario[]> {
      //return (await this.storage.get('usuarios')) || [];
      return this.crearUsuarios();
    }
  
    public async updateUsuario(rut: string, nuevoUsuario: Usuario): Promise<boolean> {
      //const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
      const usuarios: Usuario[] = await this.crearUsuarios();
      const indice = usuarios.findIndex((usu) => usu.getRut() === rut);
      if (indice === -1) {
        return false;
      }
  
      usuarios[indice] = nuevoUsuario;
      await this.storage.set('usuarios', usuarios);
      return true;
    }
  
    public async deleteUsuario(rut: string): Promise<boolean> {
      //const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];
      const usuarios: Usuario[] = await this.crearUsuarios();

      const indice = usuarios.findIndex((usu) => usu.getRut() === rut);
      if (indice === -1) {
        return false;
      }
      usuarios.splice(indice, 1);
      await this.storage.set('usuarios', usuarios);
      return true;
    }
  
    public async login(correo: string, contrasena: string): Promise<boolean> {
      const usuarios: Usuario[] = await this.crearUsuarios();
      //return usuarios.find((elemento) => elemento.email === correo && elemento.contrasena === contrasena);
      const usuario = usuarios.find((elemento) => elemento.getEmail() === correo && elemento.getContrasena() === contrasena);
      if (usuario) {
        localStorage.clear();
        localStorage.setItem('rol', usuario.getTipoUsuario()); 
        localStorage.setItem('idUsuario', usuario.getRut()); 
        return true;
      }
      return false;
  
    
    }
  
    public async recuperarUsuario(correo: string): Promise<Usuario | undefined> {
      const usuarios: Usuario[] = (await this.storage.get('usuarios')) || [];

      return usuarios.find((elemento) => elemento.getEmail() === correo);
    }
  
  
}