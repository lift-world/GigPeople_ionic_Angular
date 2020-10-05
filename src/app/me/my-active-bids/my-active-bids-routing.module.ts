import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyActiveBidsPage } from './my-active-bids.page';

const routes: Routes = [
  {
    path: '',
    component: MyActiveBidsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyActiveBidsPageRoutingModule {}
