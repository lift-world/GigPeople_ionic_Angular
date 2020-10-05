import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyActiveBidsPageRoutingModule } from './my-active-bids-routing.module';
import { MyActiveBidsPage } from './my-active-bids.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyActiveBidsPageRoutingModule,
  ],
  declarations: [MyActiveBidsPage]
})
export class MyActiveBidsPageModule {}
