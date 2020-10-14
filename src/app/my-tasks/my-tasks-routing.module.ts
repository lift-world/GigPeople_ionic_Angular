import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTasksPage } from './my-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: MyTasksPage,
    children: [
      {
        path: '',
        redirectTo: 'employer',
        pathMatch: 'full'
      },
      {
        path: 'employer',
        loadChildren: () => import('./employer/employer.module').then( m => m.EmployerPageModule)
      },
      {
        path: 'freelancer',
        loadChildren: () => import('./freelancer/freelancer.module').then( m => m.FreelancerPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTasksPageRoutingModule {}
