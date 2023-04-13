import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-empleado',
    loadChildren: () => import('./pages/home-empleado/home-empleado.module').then( m => m.HomeEmpleadoPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./pages/admin/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'areas',
    loadChildren: () => import('./pages/admin/areas/areas.module').then( m => m.AreasPageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./pages/admin/empleados/empleados.module').then( m => m.EmpleadosPageModule)
  },
  {
    path: 'crear-empleado',
    loadChildren: () => import('./pages/admin/crear-empleado/crear-empleado.module').then( m => m.CrearEmpleadoPageModule)
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
    path: 'feriados',
    loadChildren: () => import('./pages/feriados/feriados.module').then( m => m.FeriadosPageModule)
  },
  {
    path: 'crear-empleado',
    loadChildren: () => import('./pages/admin/crear-empleado/crear-empleado.module').then( m => m.CrearEmpleadoPageModule)
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
