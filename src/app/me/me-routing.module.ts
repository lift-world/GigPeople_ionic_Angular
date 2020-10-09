import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MePage } from './me.page';

const routes: Routes = [
  {
    path: "",
    component: MePage,
    children: [
      { path: "", pathMatch: "full", redirectTo: "dashboard" },
      {
        path: "settings",
        loadChildren: () =>
          import("./settings/settings.module").then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboard.module").then(
            (m) => m.DashboardPageModule
          ),
      },
      {
        path: "bookmarks",
        loadChildren: () =>
          import("./bookmarks/bookmarks.module").then(
            (m) => m.BookmarksPageModule
          ),
      },
      {
        path: "manage-bidders/:taskId",
        loadChildren: () =>
          import("./manage-bidders/manage-bidders.module").then(
            (m) => m.ManageBiddersPageModule
          ),
      },
      {
        path: "manage-tasks",
        loadChildren: () =>
          import("./manage-tasks/manage-tasks.module").then(
            (m) => m.ManageTasksPageModule
          ),
      },
      {
        path: "messages",
        loadChildren: () =>
          import("./messages/messages.module").then(
            (m) => m.MessagesPageModule
          ),
      },
      {
        path: "my-active-bids",
        loadChildren: () =>
          import("./my-active-bids/my-active-bids.module").then(
            (m) => m.MyActiveBidsPageModule
          ),
      },
      {
        path: 'post-task',
        loadChildren: () => import('./post-task/post-task.module').then(m => m.PostTaskPageModule),
      },
      {
        path: 'edit-task/:taskId',
        loadChildren: () => import('./post-task/post-task.module').then(m => m.PostTaskPageModule),        
      },
      {
        path: "reviews",
        loadChildren: () =>
          import("./reviews/reviews.module").then((m) => m.ReviewsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
