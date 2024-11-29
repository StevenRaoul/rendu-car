import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'addcar',
    loadComponent: () => import('./addcar/addcar.page').then( m => m.AddcarPage)
  },
  {
    path: 'cars',
    loadComponent: () => import('./cars/cars.page').then( m => m.CarsPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'car/:id',
    loadComponent: () => import('./car/car.page').then( m => m.CarPage)
  },
];
