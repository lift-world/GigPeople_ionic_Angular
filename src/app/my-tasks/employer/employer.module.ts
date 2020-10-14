import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EmployerPageRoutingModule } from './employer-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';

import { EmployerPage } from './employer.page';
import { List0Component } from './list0/list0.component';
import { List1Component } from './list1/list1.component';
import { List2Component } from './list2/list2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerPageRoutingModule,
    NgbModule,
    MaterialModule
  ],
  declarations: [
    EmployerPage,
    List0Component,
    List1Component,
    List2Component
  ]
})
export class EmployerPageModule {}
