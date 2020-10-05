import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostTaskPage } from './post-task.page';

const routes: Routes = [
  {
    path: '',
    component: PostTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostTaskPageRoutingModule {}
