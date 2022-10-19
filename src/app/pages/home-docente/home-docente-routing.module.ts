import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDocentePage } from './home-docente.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-docente/asistencia',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeDocentePage,
    children: [
      {
        path: 'asistencia',
        loadChildren: () => import ('../tabs/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      },
      {
        path: 'alumnos',
        loadChildren: () => import ('../tabs/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
      },
      {
        path: 'asignaturas',
        loadChildren: () => import ('../tabs/asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
      },
      {
        path: 'feriados',
        loadChildren: () => import ('../tabs/feriados/feriados.module').then( m => m.FeriadosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDocentePageRoutingModule {}
