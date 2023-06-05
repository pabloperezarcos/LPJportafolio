import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EmpleadosPageModule } from './pages/empleados/empleados.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'empleados',
    loadChildren: () => import('./pages/empleados/empleados.module').then( m => EmpleadosPageModule)
  },
  {
    path: 'crear-empleado',
    loadChildren: () => import('./pages/crear-empleado/crear-empleado.module').then( m => m.CrearEmpleadoPageModule)
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
    path: 'index',
    loadChildren: () => import('./pages/index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'feriados',
    loadChildren: () => import('./pages/feriados/feriados.module').then( m => m.FeriadosPageModule)
  },
  {
    path: 'crear-empleado',
    loadChildren: () => import('./pages/crear-empleado/crear-empleado.module').then( m => m.CrearEmpleadoPageModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  },
  {
    path: 'crear-nota',
    loadChildren: () => import('./pages/crear-nota/crear-nota.module').then( m => m.CrearNotaPageModule)
  },
  {
    path: 'detalles-empleados',
    loadChildren: () => import('./pages/modals/detalles-empleados/detalles-empleados.module').then( m => m.DetallesEmpleadosPageModule)
  },
  {
    path: 'reporteobtenido',
    loadChildren: () => import('./pages/modals/reporteobtenido/reporteobtenido.module').then( m => m.ReporteobtenidoPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
