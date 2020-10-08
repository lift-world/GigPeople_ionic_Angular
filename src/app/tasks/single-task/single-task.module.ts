import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTaskPageRoutingModule } from './single-task-routing.module';

import { SingleTaskPage } from './single-task.page';
import { PlaceBidComponent } from './place-bid/place-bid.component';
import { AboutEmployerComponent } from './about-employer/about-employer.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SingleTaskPageRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    SingleTaskPage,
    PlaceBidComponent,
    AboutEmployerComponent
  ]
})
export class SingleTaskPageModule {}
