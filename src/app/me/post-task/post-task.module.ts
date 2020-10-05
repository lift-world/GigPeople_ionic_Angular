import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostTaskPageRoutingModule } from './post-task-routing.module';
import { PostTaskPage } from './post-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostTaskPageRoutingModule,
  ],
  declarations: [PostTaskPage]
})
export class PostTaskPageModule {}
