import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerPage } from './employer.page';
import { List0Component } from './list0/list0.component';
import { List1Component } from './list1/list1.component';
import { List2Component } from './list2/list2.component';

const routes: Routes = [
  {
    path: '',
    component: EmployerPage,
    children: [
      { path: "", pathMatch: "full", redirectTo: "open-tasks" },
      {
        path: "open-tasks",
        component: List0Component
      },
      {
        path: "work-in-progress",
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
export class EmployerPageRoutingModule {}
