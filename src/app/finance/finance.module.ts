import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinancePageRoutingModule } from './finance-routing.module';

import { FinancePage } from './finance.page';
import { MembershipComponent } from './membership/membership.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MaterialModule } from '../1/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FinancePageRoutingModule,
    MaterialModule,
    NgbModule
  ],
  declarations: [
    FinancePage,
    MembershipComponent,
    PaymentComponent,
    OrderSuccessComponent,
    InvoiceComponent
  ]
})
export class FinancePageModule {}
