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
    this.mapVisible = true;
    this.destino=viaje.getDestino();
    this.coste=viaje.getCoste();
    this.horaSalida=viaje.getHoraSalida();
    this.capacidad=viaje.getCapacidad();
    this.idViaje=viaje.getIdViaje();
    this.latDest=viaje.getLatDest();
    this.longDest=viaje.getLongDest();
    this.originLat=viaje.getLatOrg();
    this.originLon=viaje.getLongOrg();

    this.viaje=viaje;
    if (this.map) {
      this.map.remove();
    }

    this.mapVisible = true; 

    if (this.originLat && this.originLon) {

        this.map = L.map("mapa").locate({ setView: true, maxZoom: 16 });
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);
  
  
        L.Routing.control({
          waypoints: [
            L.latLng(this.originLat, this.originLon), // Punto de origen
            L.latLng(this.latDest, this.longDest) // Punto de destino
          ],
          fitSelectedRoutes: true, // Ajusta el mapa para mostrar la ruta
        }).on('routesfound', (e) => {
          
        }).addTo(this.map);

      
      

    // Configura la capa de teselas para la vista del mapa
  

    }else{
      console.log("no se permite el mapa")
    }
    //this.distancia_metros=viaje.get

  }
  

  eliminarViaje(idViaje:number){

  }

  modificar(idViaje:number){

    if(this.viaje){
      this.viaje.setCoste(this.coste);
      this.viajeService.updateViaje(idViaje,this.viaje)
    }

  }
  

}
