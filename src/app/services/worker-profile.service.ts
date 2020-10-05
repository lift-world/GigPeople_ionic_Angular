import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkerProfileService {
  private serverURL = environment.serverUrl;
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  me = null;
  isLoading = false;
  subjectMe = new Subject<{ me: any; isLoading: boolean }>();

  getMe() {
    this.subjectMe.next({ me: this.me, isLoading: true });
    this.http.get(this.serverURL + "/api/worker_profile/me").subscribe(
      (resp) => {
        this.subjectMe.next({ me: resp, isLoading: false });
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message||err.message);
        this.subjectMe.next({ me: this.me, isLoading: false });
      }
    );
  }

  updateMe({ hourlyRate, title, description }) {
    this.isLoading = true;
    this.subjectMe.next({ me: this.me, isLoading: true });

    this.http.put(this.serverURL + "/api/worker_profile/me", {hourlyRate, title, description}).subscribe(
      (resp) => {
        this.me = resp;
        this.isLoading = false;
        this.subjectMe.next({ me: resp, isLoading: false });
        this.toastr.success("Updated successfully", "Profile");
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message||err.message);
        this.isLoading = false;
        this.subjectMe.next({ me: this.me, isLoading: false });
      }
    );
  }
}
