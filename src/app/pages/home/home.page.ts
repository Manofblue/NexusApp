import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAdmin: boolean;

  constructor() {
    const rol = localStorage.getItem('rol');
    this.isAdmin = rol === 'admin';

  }

}
