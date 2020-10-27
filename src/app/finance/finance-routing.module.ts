import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinancePage } from './finance.page';
import { InvoiceComponent } from './invoice/invoice.component';
import { MembershipComponent } from './membership/membership.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: "",
    component: FinancePage,
    children: [
      { path: "", pathMatch: "full", redirectTo: "payment" },
      { path: "membership", component: MembershipComponent },
      { path: "payment", component: PaymentComponent },
      { path: "order-success", component: OrderSuccessComponent },
      { path: "invoice", component: InvoiceComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancePageRoutingModule {}
