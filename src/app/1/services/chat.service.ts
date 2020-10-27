import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';

import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private serverUrl = environment.serverUrl;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  me: User;
  chats: Chat[] = [];
  subjectChats = new Subject<Chat[]>();

  isLoading = false;
  
  async doInit(me: User) {
    this.isLoading = true;
    this.me = me;
    try { 
      this.listenChats_FS(me).subscribe(async (chats: Chat_FS[]) => {
        this.chats = await this.mergeUserData(chats);
        this.subjectChats.next(this.chats);
        this.isLoading = false;
      });
    } catch (err) {
      console.log(err);
      this.toastr.error(err.message || err.msg.message, "Chat");
      this.isLoading = false;
    }
  }

  async mergeUserData(arr: Chat_FS[]) {
    let chats: Chat[] = [];
    for (let i = 0; i < arr.length; i++) {
      const { id, users, msgs } = arr[i];
      const idOther = users[0] !== this.me._id ? users[0] : users[1];
      const other = await this.userService.getUserById(idOther);
      const chat: Chat = { id, me:this.me, other, msgs };
      chats.push(chat);
    }
    return chats;
  }

  private listenChats_FS(me: User) {
    return this.afs
      .collection<Chat_FS>("chats", (ref) => ref.where("users", "array-contains", me._id) )
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => ({ id:a.payload.doc.id, ...a.payload.doc.data() }))));
  }

  get(chatId) {
    return this.afs.collection('chats').doc<any>(chatId)
      .snapshotChanges().pipe(map((doc) => {
        return {id: doc.payload.id, ...doc.payload.data()};
      }));
  }

  async startChatWith(idOther) { 
    let chatId;
    let k = this.chats.findIndex((x) => x.other._id === idOther);
    if (k>-1) {
      chatId = this.chats[k].id;
    } else {
      const newMsg: Msg = {
        senderId: this.me._id,
        content: "Hello!",
        timestamp: Date.now(),
        isRead: false,
      };

      const data = {
        users: [this.me._id, idOther],
        msgs: [newMsg],
      };

      const docRef = await this.afs.collection("chats").add(data);
      chatId = docRef.id;
    }

    return this.router.navigate(['/me/messages', chatId]);
  }

  async sendMessage(chatId, data) {
    const senderId = this.me._id;
    const newMsg: Msg = {
      senderId,
      content: data.text,
      timestamp: Date.now(),
      isRead: false
    };

    const ref = this.afs.collection("chats").doc(chatId);
    return ref.update({
      msgs: firebase.firestore.FieldValue.arrayUnion(newMsg),
    });
  }

  async markAllAsRead(chat:Chat) {
    chat.msgs.forEach((msg, i) => { 
      if (msg.senderId !== this.me._id) msg.isRead = true;
    });

    const ref = this.afs.collection("chats").doc(chat.id);
    ref.update({
      msgs: chat.msgs
    });

  }

}


interface Chat_FS { 
  id: string;
  users: string[];
  msgs: Msg[];
}

export interface Chat { 
  id: string;
  me: User;
  other: User;
  msgs: Msg[];
}

export interface Msg { 
  senderId: string;
  content: string;
  timestamp: number;
  isRead: boolean;
}
