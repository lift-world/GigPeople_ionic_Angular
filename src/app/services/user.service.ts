import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/models';

@Injectable({
  providedIn: "root",
})
export class UserService {
  private serverURL = environment.serverUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  me : User = null;
  isLoading = false;
  subjectLoading = new Subject<boolean>();
  subjectMe = new Subject<User>();

  private setLoading(isLoading:boolean) {
    this.isLoading = isLoading;
    this.subjectLoading.next(this.isLoading);
  }

  private setMe(me: User) { 
    this.me = me;
    this.subjectMe.next(this.me);
  }

  async getMe(forced = false) {
    if (!forced && this.me) return this.me;
    this.setLoading(true);
    try { 
      const me = await this.http.get<User>(this.serverURL + "/api/user/me").toPromise();
      this.setMe(me);
      this.setLoading(false);
    } catch (err) {
      console.log(err);
      this.toastr.error(err.error.message || err.message, "Server");
      this.setLoading(false);
    }
    return this.me;
  }

  updateMe({ firstName, lastName, email, country, avatarFile }) {
    this.setLoading(true);

    const formData = new FormData();
    formData.append('myfile', avatarFile, email);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("country", country);

    this.http.put<User>(this.serverURL + "/api/user/me", formData).subscribe(
      (resp) => {
        this.toastr.success("Updated successfully", "User");
        this.setMe(resp);
        this.setLoading(false);
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message||err.message);
        this.setLoading(false);
      }
    );
  }
}
