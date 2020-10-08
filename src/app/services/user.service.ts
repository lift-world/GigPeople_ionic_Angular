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

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  me = null;
  isLoading = false;
  subjectMe = new Subject<{ me: any; isLoading: boolean }>();

  getMe() {
    this.subjectMe.next({ me: null, isLoading: true });
    this.http.get(this.serverURL + "/api/user/me").subscribe(
      (resp) => {
        this.me = resp;
        this.subjectMe.next({ me: resp, isLoading: false });
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message||err.message);
        this.subjectMe.next({ me: null, isLoading: false });
      }
    );
  }

  updateMe({ firstName, lastName, email, country, avatarFile }) {
    const formData = new FormData();
    formData.append('myfile', avatarFile, email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("country", country);

    this.http.put(this.serverURL + "/api/user/me", formData).subscribe(
      (resp) => {
        this.toastr.success("Updated successfully", "User");
        this.subjectMe.next({ me: resp, isLoading: false });
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message||err.message);
      }
    );
  }
}
