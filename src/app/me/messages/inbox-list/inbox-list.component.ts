import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/1/services/chat.service';

@Component({
  selector: 'app-inbox-list',
  templateUrl: './inbox-list.component.html',
  styleUrls: ['./inbox-list.component.scss'],
})
export class InboxListComponent implements OnInit {
  @Input() chats: Chat[];
  @Input() chatId;

  constructor() { }

  ngOnInit() {}

}
