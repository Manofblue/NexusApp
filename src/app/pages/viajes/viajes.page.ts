import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/Viaje';
import { ViajeService } from 'src/app/services/viaje.service';
import * as L from 'leaflet';
import * as G from 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { EstadoViaje } from 'src/app/models/EstadoViaje';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {

  viajes: Viaje[]| undefined;
  viajesTomados: Viaje[]| undefined;
  viajesCreados: Viaje[]| undefined;

  private originLat: number | undefined;
  private originLon: number | undefined;

  private latDest:number | undefined;
  private longDest:number | undefined;
  mapVisible = false;

  

  // Variables para gestionar el mapa y el geocodificador
  private map: L.Map | undefined; // Instancia del mapa
  private geocoder: G.Geocoder | undefined; // Instancia del geocodificador
  constructor(private viajeService:ViajeService,private usuarioService:UsuarioService,private alertController: AlertController,private router: Router) {
    
   }

  async ngOnInit() {
 
  this.setearViaje();


    //this.viajes=(await this.viajeService.getAllViajes()).filter((v)=>v.getCapacidad()>0);
    
    this.map = L.map("mapaVista").locate({ setView: true, maxZoom: 16 });

    // Configura la capa de teselas para la vista del mapa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  }

  /**
   * setearViaje
   */
  public async setearViaje() {
    const rutCokie = localStorage.getItem('idUsuario');

    if (rutCokie) {
    this.viajes=this.viajesCreados=(await this.viajeService.getAllViajes())
    .filter((viaje)=>viaje.getRutCreador()!=rutCokie
    &&viaje.getCapacidad()>0&&viaje.getEstado()==EstadoViaje.Pendiente);

  
    this.viajesTomados=(await this.viajeService.getAllViajes())
    .filter((viaje)=>viaje.tienePasejo(rutCokie));
    
    this.viajesCreados=(await this.viajeService.getAllViajes())
    .filter((viaje)=>viaje.getRutCreador()==rutCokie);

    }



  }

  verDetalle(viaje: Viaje) {
    this.latDest=viaje.getLatDest();
    this.longDest=viaje.getLongDest();
    this.originLat=viaje.getLatOrg();
    this.originLon=viaje.getLongOrg();

    console.log(this.latDest+" "+this.longDest+" "+this.originLat+" "+this.originLon)

    if (this.map) {
      this.map.remove();
    }

    this.mapVisible = true; 

    if (this.originLat && this.originLon) {

        this.map = L.map("mapaVista").locate({ setView: true, maxZoom: 16 });
        
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
  }

  async tomarViaje(viaje: Viaje) {

    const rutCokie = localStorage.getItem('idUsuario');
    if (rutCokie) {  
        if(!viaje.tienePasejo(rutCokie)){
          if(viaje.esCapacidadAdecuada(1)){
            viaje.agregarPasajero(rutCokie);
            this.viajeService.updateViaje(viaje.getIdViaje(),viaje);
          }
        }else{
          this.mostrarMensaje("Ya ha tomado este viaje");
        }
      
        this.setearViaje();
    }
    // Aquí podrías agregar lógica para reservar el viaje
  }

  /**
   * eliminarViaje
viaje:Viaje   */
  public async eliminarViaje(viaje:Viaje) {
    await this.viajeService.deleteViaje(viaje.getIdViaje());
    this.setearViaje();
  }

  /**
   * bajarseViaje
   */
  public async bajarseViaje(viaje:Viaje) {

    const rutCokie = localStorage.getItem('idUsuario');
    if (rutCokie) {
        viaje?.eliminarPasajero(rutCokie);
      await this.viajeService.updateViaje(viaje.getIdViaje(),viaje);
      this.setearViaje();
    }
  }

  /**
   * editar
   */
  public async editar(viaje:Viaje) {

    const rutCokie = localStorage.getItem('idUsuario');
    if (rutCokie) {
        
      this.router.navigate(['home/editar-viaje/',viaje.getIdViaje()]);//con esto dejamos al usuario en la opcion Inicio del tab

      await this.viajeService.updateViaje(viaje.getIdViaje(),viaje);
      this.setearViaje();
    }
  }

  /**
   * verCreador
   */
  public async verCreador(rut:string) {
    var usuario=await this.usuarioService.getUsuario(rut);

    return usuario?.getUsuario;
  }

  refrescarViajes(){
    this.setearViaje();
  }


  async mostrarMensaje(mensaje:String) {
    const alert = await this.alertController.create({
      animated: true,
      backdropDismiss: true,
      message: mensaje+'',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();

  }
}
