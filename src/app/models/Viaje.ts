import { EstadoViaje } from './EstadoViaje';
import { Vehiculo } from './Vehiculo';

export class Viaje {
    private origen: string;
    private destino: string;
    private coste: number;
    private duracion: number;
    private estado: EstadoViaje;
    private capacidad: number; // Capacidad del viaje (número de plazas disponibles)
    private vehiculo: Vehiculo; // Vehículo asociado al viaje

    constructor(
        origen: string,
        destino: string,
        coste: number,
        duracion: number,
        estado: EstadoViaje,
        capacidad: number,
        vehiculo: Vehiculo // Aceptamos un vehículo
    ) {
        this.origen = origen;
        this.destino = destino;
        this.coste = coste;
        this.duracion = duracion;
        this.estado = estado;
        this.vehiculo = vehiculo,
        this.capacidad = this.vehiculo.getPlazas();
    }

    // Método para verificar si la capacidad es adecuada
    public esCapacidadAdecuada(): boolean {
        return this.capacidad <= this.vehiculo.getPlazas();
    }

    // Métodos de acceso (getters)
    public getOrigen(): string {
        return this.origen;
    }

    public getDestino(): string {
        return this.destino;
    }

    public getCoste(): number {
        return this.coste;
    }

    public getDuracion(): number {
        return this.duracion;
    }

    public getEstado(): EstadoViaje {
        return this.estado;
    }

    public getCapacidad(): number {
        return this.capacidad;
    }
}
