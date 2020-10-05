import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { TasksPage } from './tasks.page';

const routes: Routes = [
  {
    path: '',
    component: TasksPage
  },
  {
    path: 'browse',
    loadChildren: () => import('./browse/browse.module').then( m => m.BrowsePageModule)
  },
  {
    path: 'single-task/:taskId',
    loadChildren: () => import('./single-task/single-task.module').then( m => m.SingleTaskPageModule)
  },
  {
    path: 'post-task',
    loadChildren: () => import('./post-task/post-task.module').then(m => m.PostTaskPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-task/:taskId',
    loadChildren: () => import('./post-task/post-task.module').then(m => m.PostTaskPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule {}
