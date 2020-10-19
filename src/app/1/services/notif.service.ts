import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/models';
import { UserService } from './user.service';

@Injectable({
  providedIn: "root",
})
export class NotifService {

  collection: AngularFirestoreCollection;
  constructor(
    private afs: AngularFirestore,
    private userService: UserService
  ) {
    this.collection = this.afs.collection("/notification");
    this.setListener();
  }

  private me: User;
  async setListener() { 
    this.me = await this.userService.getMe();
    this.collection.doc(this.me._id).snapshotChanges();
  }
}
