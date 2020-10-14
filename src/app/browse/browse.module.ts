import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowsePageRoutingModule } from './browse-routing.module';

import { BrowsePage } from './browse.page';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../1/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BrowsePageRoutingModule,
    MaterialModule
  ],
  declarations: [
    BrowsePage,
    SearchComponent,
    ListComponent
  ]
})
export class BrowsePageModule {}
