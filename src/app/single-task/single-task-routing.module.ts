import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BidsComponent } from './bids/bids.component';
import { ContractComponent } from './contract/contract.component';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';

import { SingleTaskPage } from './single-task.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTaskPage,
    children: [
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full'
      },
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path: 'bids',
        component: BidsComponent
      },
      {
        path: 'contract',
        component: ContractComponent
      },
      {
        path: 'review',
        component: ReviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTaskPageRoutingModule {}
