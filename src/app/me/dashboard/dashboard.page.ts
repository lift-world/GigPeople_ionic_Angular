import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/1/services/finance.service';
import { UserService } from 'src/app/1/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(
    public userService: UserService,
    public financeService: FinanceService,
  ) { }

  ngOnInit() {
    
  }

}
