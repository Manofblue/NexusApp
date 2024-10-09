//mejora la integridad de los datos 

export class Usuario {
    constructor(
      public fecha_nacimiento: string,
      public rut: string,
      public tipo_usuario: string,  
      public usuario: string,
      public contrasena: string,
      public contrasena_conf: string,
      public email: string,
      public patente: string,
      public marca: string,
      public modelo: string,
      public color: string,
      public tieneVehiculo: boolean
    ) {}
  }


  