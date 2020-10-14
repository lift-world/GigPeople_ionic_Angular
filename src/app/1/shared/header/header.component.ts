import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/1/services/user.service';
import { User } from 'src/app/1/models/models';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  userIsAuthenticated = false;
  private subsAuth: Subscription;

  me:User = null;
  private subsMe: Subscription;
  isLoading = false;
  private subsLoading: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {}

  async ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.getMe();
    
    this.subsAuth = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.getMe();
      });
    
    this.subsMe = this.userService.subjectMe.subscribe(me => {
      this.me = me;
    });
  }

  async getMe() { 
    if (this.userIsAuthenticated) this.me = await this.userService.getMe();
    else this.me = null;
  }

  ngOnDestroy(): void {
    this.subsAuth.unsubscribe();
    this.subsMe.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  isUserMenu = false;
  toggleUserMenu() {
    this.isUserMenu = !this.isUserMenu;
    return false;
  }

  onClickLogout() {
    this.authService.logout();

    return false; // disable href
  }
}
