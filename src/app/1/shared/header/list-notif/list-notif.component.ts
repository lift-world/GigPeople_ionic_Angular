import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notif_Type } from 'src/app/1/models/enums';
import { NotifService, Notif } from 'src/app/1/services/notif.service';

@Component({
  selector: "app-list-notif",
  templateUrl: "./list-notif.component.html",
  styleUrls: ["./list-notif.component.scss"],
})
export class ListNotifComponent implements OnInit {
  Notif_Type = Notif_Type;
  constructor(public notifService: NotifService) {}

  subsNotifs: Subscription;
  notifs: Notif[] = [];
  numNotRead = 0;
  ngOnInit() {
    this.subsNotifs = this.notifService.subjectNotifs.subscribe((notifs) => {
      this.notifs = notifs.slice(0, 10);
      this.numNotRead = notifs.filter((x) => x.isRead === false).length;
    });
  }

  onClickNotif(notif: Notif, i) {
    console.log(this.numNotRead);
    this.notifService.markAsRead(notif.id);
    this.numNotRead--;
  }
}
