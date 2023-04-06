import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-alumno',
    loadChildren: () => import('./pages/empleado/home-alumno.module').then( m => m.HomeAlumnoPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/admin/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-pass-modal',
    loadChildren: () => import('./pages/modals/recuperar-pass-modal/recuperar-pass-modal.module').then( m => m.RecuperarPassModalPageModule)
  },
  {
    path: 'register-user-modal',
    loadChildren: () => import('./pages/modals/register-user-modal/register-user-modal.module').then( m => m.RegisterUserModalPageModule)
  },
  {
    path: 'registro-clase-modal',
    loadChildren: () => import('./pages/modals/registro-clase-modal/registro-clase-modal.module').then( m => m.RegistroClaseModalPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'alumnos',
    loadChildren: () => import('./pages/tabs/alumnos/alumnos.module').then( m => m.AlumnosPageModule)
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./pages/tabs/asignaturas/asignaturas.module').then( m => m.AsignaturasPageModule)
  },
  {
    path: 'feriados',
    loadChildren: () => import('./pages/feriados/feriados.module').then( m => m.FeriadosPageModule)
  },
  {
    path: 'agregar-alumno',
    loadChildren: () => import('./pages/admin/crud-empleado/agregar-alumno.module').then( m => m.AgregarAlumnoPageModule)
  },
  {
    path: 'registro-asistencia',
    loadChildren: () => import('./pages/tabs-alumno/registro-asistencia/registro-asistencia.module').then( m => m.RegistroAsistenciaPageModule)
  },
  {
    path: 'recordatorios',
    loadChildren: () => import('./pages/tabs-alumno/recordatorios/recordatorios.module').then( m => m.RecordatoriosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
