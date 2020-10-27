import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/1/auth/auth.guard';
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
        path: "finance",
        loadChildren: () =>
          import("./finance/finance.module").then(
            (m) => m.FinancePageModule
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
        path: "messages",
        loadChildren: () =>
          import("./messages/messages.module").then(
            (m) => m.MessagesPageModule
          ),
      },
      {
        path: "post-task",
        loadChildren: () =>
          import("./post-task/post-task.module").then(
            (m) => m.PostTaskPageModule
          ),
      },
      {
        path: "edit-task/:taskId",
        loadChildren: () =>
          import("./post-task/post-task.module").then(
            (m) => m.PostTaskPageModule
          ),
      },
      {
        path: "reviews",
        loadChildren: () =>
          import("./reviews/reviews.module").then((m) => m.ReviewsPageModule),
      },
    ],
  },
  {
    path: "finance",
    loadChildren: () =>
      import("./finance/finance.module").then((m) => m.FinancePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MePageRoutingModule {}
