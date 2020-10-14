import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreelancerPageRoutingModule } from './freelancer-routing.module';

import { FreelancerPage } from './freelancer.page';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { List0Component } from './list0/list0.component';
import { List1Component } from './list1/list1.component';
import { List2Component } from './list2/list2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreelancerPageRoutingModule,
    NgbNavModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    FreelancerPage,
    List0Component,
    List1Component,
    List2Component
  ]
})
export class FreelancerPageModule {}
