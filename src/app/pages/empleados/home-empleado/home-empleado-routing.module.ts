import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEmpleadoPage } from './home-empleado.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-empleado/asistencia',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeEmpleadoPage,
    children: [
      {
        path: 'asistencia',
        loadChildren: () => import ('../registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEmpleadoPageRoutingModule {}
