import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTaskPageRoutingModule } from './single-task-routing.module';

import { SingleTaskPage } from './single-task.page';
import { PlaceBidComponent } from './1/place-bid/place-bid.component';
import { AboutEmployerComponent } from './1/about-employer/about-employer.component';
import { MaterialModule } from 'src/app/1/material.module';
import { SharedModule } from 'src/app/1/shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { BidsComponent } from './bids/bids.component';
import { ContractComponent } from './contract/contract.component';
import { ReviewComponent } from './review/review.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleTaskService } from './1/single-task.service';
import { ContractModalComponent } from './bids/contract-modal/contract-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SingleTaskPageRoutingModule,
    MaterialModule,
    SharedModule,
    NgbModule
  ],
  declarations: [
    SingleTaskPage,
    PlaceBidComponent,
    AboutEmployerComponent,
    DetailsComponent,
    BidsComponent,
    ContractComponent,
    ReviewComponent,
    ContractModalComponent
  ],
  providers: [
    SingleTaskService
  ]
})
export class SingleTaskPageModule {}
