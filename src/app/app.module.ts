import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {IonicStorageModule} from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioRepository } from './repository/UsuarioRepository';
import { LocalStorageRepository } from './repository/LocalStorageRepository';
import { environment } from '../environments/environment.prod'
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot({
    innerHTMLTemplatesEnabled: true
  }), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    IonicStorageModule.forRoot()],
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
