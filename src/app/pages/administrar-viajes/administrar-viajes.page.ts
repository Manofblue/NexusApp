import { Component, OnInit } from '@angular/core';
import { EstadoViaje } from 'src/app/models/EstadoViaje';
import { Viaje } from 'src/app/models/Viaje';
import { ViajeService } from 'src/app/services/viaje.service';
import * as L from 'leaflet';
import * as G from 'leaflet-control-geocoder';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-administrar-viajes',
  templateUrl: './administrar-viajes.page.html',
  styleUrls: ['./administrar-viajes.page.scss'],
})
export class AdministrarViajesPage implements OnInit {
  
  viajes: Viaje[]| undefined;
  private defaultLat: number = -33.608552227594245; 
  private defaultLon: number = -70.58039819211703;
  
  // Variables para almacenar las coordenadas de origen
  private originLat: number | undefined;
  private originLon: number | undefined;

  private latDest:number | undefined;
  private longDest:number | undefined;

  // Variables para gestionar el mapa y el geocodificador
  private map: L.Map | undefined; // Instancia del mapa
  latitud: number = 0; // Latitud actual
  longitud: number = 0; // Longitud actual
  direccion: string = ""; // Cadena de dirección
  distancia_metros: number = 0; // Distancia en metros
  tiempo_segundos: number = 0; // Tiempo en segundos
  descripcion:String="";
  horaSalida:Date | undefined;
  origen: string="";
  destino: string="";
  coste: number=0;
  duracion: number=0;
  capacidad:number=0;
  mapVisible = false;
  idViaje:number=0;
  viaje:Viaje|undefined;




  constructor(private viajeService:ViajeService) { }

  async ngOnInit() {

    this.viajes=(await this.viajeService.getAllViajes());
  }


  crearViaje() {
    
  }

  async actualizarViaje(viaje:Viaje){


  }
  

  async eliminarViaje(idViaje: number) {
    const eliminado = await this.viajeService.deleteViaje(idViaje);
    if (eliminado) {
      this.viajes = await this.viajeService.getAllViajes(); 
    } else {
    }
  }

  modificar(idViaje:number){

    if(this.viaje){
      this.viaje.setCoste(this.coste);
      this.viajeService.updateViaje(idViaje,this.viaje)
    }

  }

  
  

}
