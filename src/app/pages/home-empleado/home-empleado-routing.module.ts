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
        loadChildren: () => import ('../tabs-empleados/registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
      },
      {
        path: 'recordatorios',
        loadChildren: () => import ('../tabs-empleados/recordatorios/recordatorios.module').then( m => m.RecordatoriosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEmpleadoPageRoutingModule {}
