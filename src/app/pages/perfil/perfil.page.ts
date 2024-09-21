import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: any;
  rut:string="";

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    const rutCokie = localStorage.getItem('idUsuario');
    if (rutCokie) {
      this.rut = rutCokie; 
      this.usuario = this.usuarioService.getUsuario(this.rut); 
    }

  }

}
