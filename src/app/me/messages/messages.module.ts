import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MessagesPageRoutingModule } from './messages-routing.module';
import { MessagesPage } from './messages.page';
import { InboxListComponent } from './inbox-list/inbox-list.component';
import { MessageBodyComponent } from './message-body/message-body.component';
import { MaterialModule } from 'src/app/1/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MessagesPageRoutingModule,
    MaterialModule
  ],
  declarations: [
    MessagesPage,
    InboxListComponent,
    MessageBodyComponent
  ]
})
export class MessagesPageModule {}
