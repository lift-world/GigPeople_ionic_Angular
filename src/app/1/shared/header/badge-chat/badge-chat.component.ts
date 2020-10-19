import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chat, ChatService, Msg } from 'src/app/1/services/chat.service';

@Component({
  selector: "app-badge-chat",
  templateUrl: "./badge-chat.component.html",
  styleUrls: ["./badge-chat.component.scss"],
})
export class BadgeChatComponent implements OnInit, OnDestroy {
  @Input() isDropDown: boolean;
  @Output() handleClickIcon = new EventEmitter<any>();
  @Output() handleMouseLeave = new EventEmitter<any>();

  constructor(public chatService: ChatService) {}

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
          msgs.push(msg); this.unreadMsgsCnt++;
        }
      });
      if (msgs.length > 0) {
        this.unreadChats.push({...chat, msgs});
      }
    });
  }
}
