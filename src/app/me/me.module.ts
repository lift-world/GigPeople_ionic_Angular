import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../shared/shared.module';
import { MePageRoutingModule } from './me-routing.module';

import { MePage } from './me.page';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';
import { ManageBiddersComponent } from './manage-bidders/manage-bidders.component';
import { MyActiveBidsComponent } from './my-active-bids/my-active-bids.component';
import { PostTaskComponent } from './post-task/post-task.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MePageRoutingModule,
    SharedModule
  ],
  declarations: [
    MePage,
    DashboardComponent,
    MessagesComponent,
    BookmarksComponent,
    ReviewsComponent,
    ManageTasksComponent,
    ManageBiddersComponent,
    MyActiveBidsComponent,
    PostTaskComponent,
    SettingsComponent
  ]
})
export class MePageModule {}
