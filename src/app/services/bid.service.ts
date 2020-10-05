import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment"; 

@Injectable({
  providedIn: 'root'
})
export class BidService {
  serverURL = environment.serverUrl;

  constructor(private http: HttpClient) { }

  createOne(bidData: Bid) {
    return this.http.post<Bid>(this.serverURL + '/api/bid', { bidData });
  }

  readByTaskId(taskId: string) {
    return this.http.post<Bid[]>(this.serverURL + '/api/bid/readByTaskId', { taskId });
  }

  deleteOne(id: string) {
    return this.http.post(this.serverURL + '/api/bid/deleteOne', { id });
  }
}

export interface Bid {
  _id: string;
  refTask: string;
  refBidder: string;
  description: string;
  budget: number;
  duration: number;
  timestamp: Date;
}
