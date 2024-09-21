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

  ngOnInit() {}

  public recuperarContrasena(): void {
    if (this.isEmailValid()) {
      this.showAlert();
    }
  }

  public isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.correo);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      animated: true,
      backdropDismiss: true,
      message: 'Correo enviado a ' + this.correo + ' para recuperar la contraseña.',
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
