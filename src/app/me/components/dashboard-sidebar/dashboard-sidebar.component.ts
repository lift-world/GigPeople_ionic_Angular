import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/1/auth/auth.service';

@Component({
  selector: "app-dashboard-sidebar",
  templateUrl: "./dashboard-sidebar.component.html",
  styleUrls: ["./dashboard-sidebar.component.scss"],
})
export class DashboardSidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onClickLogout() { 
    this.authService.logout();
    return false;
  }
}
