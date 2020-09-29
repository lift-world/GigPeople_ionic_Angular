import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  userIsAuthenticated = false;
  private subsAuth: Subscription;

  me = null;
  private isLoadingMe = false;
  private subsMe: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.subsAuth = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.me = this.userService.me;
    this.isLoadingMe = this.userService.isLoading;
    this.subsMe = this.userService.subjectMe.subscribe((data: {me:any, isLoading :boolean }) => { 
      this.isLoadingMe = data.isLoading;
      this.me = data.me;
    });
  }

  ngOnDestroy(): void {
    this.subsAuth.unsubscribe();
    this.subsMe.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  onMenuToggle() {
    console.log("Menu!");
  }

  onClickLogout() {
    this.authService.logout();
    
    return false; // disable href
  }
}
