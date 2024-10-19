import { Injectable } from '@angular/core';
import { Viaje } from '../models/Viaje';
import { ViajeRepository } from './ViajeRepository';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ViajeRepositoryImplStorage implements ViajeRepository {
  private viajes: Viaje[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const viajesRaw: any[] = await this.storage.get('viajes') || [];
    this.viajes = this.mapToViajes(viajesRaw);
  }

  private mapToViajes(viajesRaw: any[]): Viaje[] {
    var viaje:Viaje;
    return viajesRaw.map(v => {
      const viaje = new Viaje(
          v.destino,
          v.coste,
          v.duracion,
          v.estado,
          v.capacidad,
          v.latDest,
          v.longDest,
          v.latOrg,
          v.longOrg,
          v.rutCreador,
          v.horaSalida,
          v.idViaje
      );
      viaje.setPasajeros( v.pasajeros || []) ; 
      return viaje;
  });
  }

  public async createViaje(viaje: Viaje): Promise<boolean> {
    const viajes: Viaje[] = await this.getAllViajes();

    if (viajes.find(v => v.getIdViaje() === viaje.getIdViaje()) !== undefined) {
      return false; // Viaje ya existe
    }

    viajes.push(viaje);
    await this.storage.set('viajes', viajes);
    return true; // Indica que la operación fue exitosa
  }

  public async getViaje(id: number): Promise<Viaje | null> {
    const viajes: Viaje[] = await this.getAllViajes();
    return viajes.find(v => v.getIdViaje() === id) || null;
  }

  public async getAllViajes(): Promise<Viaje[]> {
    const viajesRaw: any[] = await this.storage.get('viajes') || [];
    return this.mapToViajes(viajesRaw);
  }
  public async updateViaje(id: number, viaje: Viaje): Promise<boolean> {

    const viajes: Viaje[] = await this.getAllViajes();
    console.log(viajes);
    const index = viajes.findIndex(v => v.getIdViaje() == id);

    if (index === -1) {
      console.log("viaje no actualizado");
      return false; // Viaje no encontrado
    }

    viajes[index] = viaje;
    console.log("viaje  actualizado");
    await this.storage.set('viajes', viajes);
    return true; // Indica que la operación fue exitosa
  }

  public async deleteViaje(id: number): Promise<boolean> {
    const viajes: Viaje[] = await this.getAllViajes();
    const index = viajes.findIndex(v => v.getIdViaje() === id);

    if (index === -1) {
      return false; // Viaje no encontrado
    }

    viajes.splice(index, 1);
    await this.storage.set('viajes', viajes);
    return true; // Indica que la operación fue exitosa
  }

 

  public async agregarPasajero(rut:String,viaje:Viaje):Promise<void>{

    const viajes: Viaje[] = await this.getAllViajes();
    const index = viajes.findIndex(v => v==viaje);
    viaje.agregarPasajero(rut);    

    viajes[index] = viaje;
    await this.storage.set('viajes', viajes);

  }
}
