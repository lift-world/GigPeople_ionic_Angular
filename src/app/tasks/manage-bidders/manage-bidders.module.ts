import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManageBiddersPageRoutingModule } from './manage-bidders-routing.module';
import { ManageBiddersPage } from './manage-bidders.page';
import { SharedModule } from 'src/app/1/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageBiddersPageRoutingModule,
    SharedModule
  ],
  declarations: [ManageBiddersPage]
})
export class ManageBiddersPageModule {}
