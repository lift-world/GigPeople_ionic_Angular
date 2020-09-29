import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBiddersComponent } from './manage-bidders/manage-bidders.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';

import { MePage } from './me.page';
import { MessagesComponent } from './messages/messages.component';
import { MyActiveBidsComponent } from './my-active-bids/my-active-bids.component';
import { PostTaskComponent } from './post-task/post-task.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MePage,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'bookmarks', component: BookmarksComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'manage-tasks', component: ManageTasksComponent },
      { path: 'manage-bidders', component: ManageBiddersComponent },
      { path: 'my-active-bids', component: MyActiveBidsComponent },
      { path: 'post-task', component: PostTaskComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
