import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Talleres · Escuela Forma',
    loadComponent: () => import('./pages/workshop-list/workshop-list').then((m) => m.WorkshopList),
  },
  {
    path: 'talleres/:slug',
    title: 'Taller · Escuela Forma',
    loadComponent: () => import('./pages/workshop-detail/workshop-detail').then((m) => m.WorkshopDetail),
  },
  { path: '**', redirectTo: '' },
];
