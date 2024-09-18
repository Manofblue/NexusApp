import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  correo: string = "";


  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }


  /**
   * name
   */
   public recuperarContrasena():void {
   
         this.showAlert;
   
    }

   async showAlert() {
    const alert =  await this.alertController.create({
      animated: true,
      backdropDismiss: true,
      message: 'Correo Enviado a '+this.correo+' Para recuperar la contraseña',
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
