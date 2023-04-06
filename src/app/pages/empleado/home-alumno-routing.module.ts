import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAlumnoPage } from './home-alumno.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-alumno/asistencia',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeAlumnoPage,
    children: [
      {
        path: 'asistencia',
        loadChildren: () => import ('../tabs-alumno/registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
      },
      {
        path: 'recordatorios',
        loadChildren: () => import ('../tabs-alumno/recordatorios/recordatorios.module').then( m => m.RecordatoriosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAlumnoPageRoutingModule {}
