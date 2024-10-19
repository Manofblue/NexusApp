import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'reservas',
        loadChildren: () => import('../reservas/reservas.module').then(m => m.ReservasPageModule)
      },
      {
        path: 'administrar',
        loadChildren: () => import('../administrar/administrar.module').then(m => m.AdministrarPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'viajes',
        loadChildren: () => import('../viajes/viajes.module').then(m => m.ViajesPageModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: '',
        redirectTo: 'inicio',  // Redirige a inicio si no hay subruta especificada
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

