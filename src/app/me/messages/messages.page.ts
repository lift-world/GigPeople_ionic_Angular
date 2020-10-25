import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { Chat, ChatService } from 'src/app/1/services/chat.service';

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"],
})
export class MessagesPage implements OnInit {
  chats: Chat[] = [];
  subsChats: Subscription;

  chatId;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public chatService: ChatService
  ) {
    this.chats = this.chatService.chats;
    this.subsChats = this.chatService.subjectChats.subscribe((chats) => {
      this.chats = chats;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      if (paramMap.has("chatId")) {
        this.chatId = paramMap.get("chatId");
      } else {
        this.chatId = null;
      }
    });
  }

  ngOnDestroy() {
    this.subsChats.unsubscribe();
  }

  getChatById(chats:Chat[], chatId) {
    return chats.find(x => x.id === chatId) || null;
  }

  handleSubmit(data) {
    this.chatService.sendMessage(this.chatId, data);
  }

  markAllAsRead(chat: Chat) {
    this.chatService.markAllAsRead(chat);
  }
}
