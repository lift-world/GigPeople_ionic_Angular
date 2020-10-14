import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/1/auth/auth.guard';
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
    path: "manage-bidders/:taskId",
    loadChildren: () =>
      import("./manage-bidders/manage-bidders.module").then(
        (m) => m.ManageBiddersPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksPageRoutingModule {}
