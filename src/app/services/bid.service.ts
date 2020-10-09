import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment"; 
import { Bid } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  serverURL = environment.serverUrl;

  constructor(private http: HttpClient) { }

  createOne({taskId, budget, duration, description}) {
    return this.http.post<Bid>(this.serverURL + "/api/bid", {
      taskId,
      budget,
      duration,
      description,
    });
  }

  readByTaskId(taskId: string) {
    return this.http.post<Bid[]>(this.serverURL + '/api/bid/readByTaskId', { taskId });
  }

  deleteOne(id: string) {
    return this.http.post(this.serverURL + '/api/bid/deleteOne', { id });
  }

  readMyActiveBids() {
    return this.http.get<Bid[]>(this.serverURL + '/api/bid/myActiveBids');
  }

  updateOne({id, budget, duration, description}) {
    return this.http.put<Bid>(this.serverURL + '/api/bid', {
      id, budget, duration, description
    });    
  }
}
