import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { AccountComponent } from './account/account.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';
import { SecurityComponent } from './security/security.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    SettingsPage,
    AccountComponent,
    EmployerProfileComponent,
    WorkerProfileComponent,
    SecurityComponent
  ]
})
export class SettingsPageModule {}
