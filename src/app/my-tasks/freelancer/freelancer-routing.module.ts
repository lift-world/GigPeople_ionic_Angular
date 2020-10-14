import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreelancerPage } from './freelancer.page';
import { List0Component } from './list0/list0.component';
import { List1Component } from './list1/list1.component';
import { List2Component } from './list2/list2.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancerPage,
    children: [
      { path: "", pathMatch: "full", redirectTo: "current-tasks" },
      {
        path: "active-bids",
        component: List0Component
      },
      {
        path: "current-tasks",
        component: List1Component
      },
      {
        path: "past-tasks",
        component: List2Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerPageRoutingModule {}
