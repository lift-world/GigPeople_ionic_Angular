import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private serverURL = environment.serverUrl;

  me = null;
  isLoading = false;
  subjectMe = new Subject<{ me: any, isLoading: boolean}>();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getMe() {
    this.subjectMe.next({me: null, isLoading: true});
    this.http.get(this.serverURL + "/api/user/me").subscribe(
      (resp) => {
        this.subjectMe.next({ me: resp, isLoading: false });
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message);
        this.subjectMe.next({ me: null, isLoading: false });
      }
    );
  }
}
