import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManageBiddersPageRoutingModule } from './manage-bidders-routing.module';
import { ManageBiddersPage } from './manage-bidders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageBiddersPageRoutingModule,
  ],
  declarations: [ManageBiddersPage]
})
export class ManageBiddersPageModule {}
