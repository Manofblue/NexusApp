import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Usuario | null = null; // Inicialmente nulo

  rut:string="";

  constructor(private usuarioService: UsuarioService) {

    

   }

  async ngOnInit() {
    const rutCokie = localStorage.getItem('idUsuario');
    if (rutCokie) {
      this.rut = rutCokie; 
      const datosUsuario = await this.usuarioService.getUsuario(rutCokie);
      if (datosUsuario) {
        this.usuario = datosUsuario; 
      } else {
        console.log('Usuario no encontrado');
      }
   
    }

  }

}
