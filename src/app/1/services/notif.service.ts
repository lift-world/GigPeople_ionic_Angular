import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { firestore } from "firebase";
import { ToastrService } from "ngx-toastr";
import { Subject, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/models";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class NotifService {
  private serverUrl = environment.serverUrl;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  
  isLoading = false;

  me: User;
  notifs: Notif[] = [];
  subjectNotifs = new Subject<Notif[]>();

  async doInit(me: User) {
    this.isLoading = true;
    this.me = me;
    try {
      this.listen_FS(me).subscribe((notifs: Notif[]) => { 
        this.notifs = notifs;
        this.subjectNotifs.next(this.notifs);
        this.isLoading = false;
      });
    } catch (err) {
      console.log(err);
      this.toastr.error(err.message || err.msg.message, "Notification Server");
      this.isLoading = false;
    }
  }

  listen_FS(me) { 
    return this.afs
      .collection<Notif>("notifications", (ref)=> ref.where("userId", "==", me._id))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => ({
            id: a.payload.doc.id,
            ...a.payload.doc.data(),
          }))
        )
      );
  }

  async markAsRead(id) {
    const ref = this.afs.collection("notifications").doc(id);
    ref.update({ isRead: true });
  }

}

export interface Notif {
  id: string;
  userId: string;
  timestamp: number;
  text: string;
  type: number;
  data: any;
  isRead: boolean;
}
