import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //aquí podemos crear variables, constrantes, listas, arreglos, json, etc:
  //NOMBRE_VARIABLE: TIPO_DATO = VALOR;
  titulo: string = "PÁGINA DE LOGIN";
  

  //NgModel:
  email: string = "";
  password: string = "";

  constructor(private router: Router,private alertController: AlertController, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  //método asociado al boton para hacer un login:
  login(){
    if(this.usuarioService.login(this.email,this.password)){

      
      this.router.navigate(['/home']);
    }else{
      this.showAlert()
    }
  }


  async showAlert() {
    const alert =  await this.alertController.create({
      animated: true,
      backdropDismiss: true,
      message: new IonicSafeString(`<img src="../../assets/imgs/popin.jpeg" alt="photo" />`),
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
