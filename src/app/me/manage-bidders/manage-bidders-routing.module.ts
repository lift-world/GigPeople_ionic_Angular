import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageBiddersPage } from './manage-bidders.page';

const routes: Routes = [
  {
    path: '',
    component: ManageBiddersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageBiddersPageRoutingModule {}
