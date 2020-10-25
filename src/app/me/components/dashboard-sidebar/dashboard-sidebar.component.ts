import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/1/auth/auth.service';
import { ChatService, Chat } from 'src/app/1/services/chat.service';

@Component({
  selector: "app-dashboard-sidebar",
  templateUrl: "./dashboard-sidebar.component.html",
  styleUrls: ["./dashboard-sidebar.component.scss"],
})
export class DashboardSidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public chatService: ChatService
  ) {}

  subsChats: Subscription;
  ngOnInit() {
    this.subsChats = this.chatService.subjectChats.subscribe((chats) => {
      this.getUnreadMsgs(chats);
    });
  }

  ngOnDestroy() {
    this.subsChats.unsubscribe();
  }

  unreadChats: Chat[] = [];
  unreadMsgsCnt = 0;
  getUnreadMsgs(chats: Chat[]) {
    this.unreadChats = [];
    this.unreadMsgsCnt = 0;
    chats.forEach((chat, i) => {
      let msgs = [];
      chat.msgs.forEach((msg, j) => {
        if (!msg.isRead && msg.senderId !== chat.me._id) {
          msgs.push(msg);
          this.unreadMsgsCnt++;
        }
      });
      if (msgs.length > 0) {
        this.unreadChats.push({ ...chat, msgs });
      }
    });
  }

  onClickLogout() {
    this.authService.logout();
    return false;
  }
}
