import { FinanceService } from 'src/app/1/services/finance.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/1/auth/auth.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/1/services/user.service';
import { User } from 'src/app/1/models/models';
import { ChatService } from 'src/app/1/services/chat.service';
import { NotifService } from 'src/app/1/services/notif.service';

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
    private userService: UserService,
    private chatService: ChatService,
    private notifService: NotifService,
    public financeService: FinanceService
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
    if (this.userIsAuthenticated) {
      this.me = await this.userService.getMe();
      this.chatService.doInit(this.me);
      this.notifService.doInit(this.me);
      this.financeService.loadProfile(this.me);
    } else {
      this.me = null;      
    }
  }

  ngOnDestroy(): void {
    this.subsAuth.unsubscribe();
    this.subsMe.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  mids = {
    off: 0,
    notify: 1,
    chat: 2,
    user: 3
  };
  
  menuId = 0;

  onClickLogout() {
    this.authService.logout();

    return false; // disable href
  }
}
