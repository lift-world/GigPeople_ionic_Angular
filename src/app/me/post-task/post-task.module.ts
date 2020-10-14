import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostTaskPageRoutingModule } from './post-task-routing.module';

import { PostTaskPage } from './post-task.page';
import { MaterialModule } from 'src/app/1/material.module';
import { SharedModule } from 'src/app/1/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    PostTaskPageRoutingModule,
  ],
  declarations: [PostTaskPage],
})
export class PostTaskPageModule {}
