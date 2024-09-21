import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAdmin: boolean;

  constructor(private router: Router) {
    const rol = localStorage.getItem('rol');
    this.isAdmin = rol === 'admin';

  }

  /**
   * home
 :void  */
  public home():void {
    this.router.navigate(['/home']);

  }

}
