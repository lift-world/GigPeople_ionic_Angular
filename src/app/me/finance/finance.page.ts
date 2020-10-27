import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/1/services/finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.page.html',
  styleUrls: ['./finance.page.scss'],
})
export class FinancePage implements OnInit {

  constructor(public financeService: FinanceService) { }

  ngOnInit() {
  }

}
