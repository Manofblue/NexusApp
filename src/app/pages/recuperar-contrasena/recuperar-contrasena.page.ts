import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

//import * as nodemailer from 'nodemailer';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  correo: string = "";

  constructor(private alertController: AlertController,private usuarioService:UsuarioService) { }

  ngOnInit() {}

  public async recuperarContrasena(): Promise< void> {
    

      var correo=await this.usuarioService.recuperarUsuario(this.correo)
      if(correo){
        this.showAlert('Correo enviado a ' + this.correo + ' para recuperar la contraseña.');
      }else{
        this.showAlert('No existe el correo: ' + this.correo );
      }
      
    
  }

  public isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.correo);
  }

  async showAlert(correo:string) {
    const alert = await this.alertController.create({
      animated: true,
      backdropDismiss: true,
      message: correo,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }


/*

      public transporter = nodemailer.createTransport({
        host: 'smtp.office365.com', // Cambia por tu host SMTP
        port: 587, // O el puerto que uses
        secure: false, // true para 465, false para otros
        auth: {
          user: 'recuperarContrasenaNexxus@outlook.com', // Tu correo
          pass: '@6q1q#IWRw09z1QRI', // Tu contraseña
        },
      });


      public enviarCorreo = (destinatario: string, asunto: string, mensaje: string) => {
        const mailOptions = {
          from: 'tuemail@example.com',
          to: destinatario,
          subject: asunto,
          text: mensaje,
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log('Error al enviar el correo: ', error);
          }
          console.log('Correo enviado: ' + info.response);
        });
      };
*/
}
