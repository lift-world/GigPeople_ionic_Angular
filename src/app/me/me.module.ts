import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from 'src/app/1/shared/shared.module';
import { MePageRoutingModule } from './me-routing.module';

import { MePage } from './me.page';
import { SmallFooterComponent } from './components/small-footer/small-footer.component';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MePageRoutingModule,
    SharedModule
  ],
  declarations: [
    MePage,
    //Components
    SmallFooterComponent,
    DashboardSidebarComponent,
  ]
})
export class MePageModule {}
