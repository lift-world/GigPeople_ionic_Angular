import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { FinancialProfile, User } from "src/app/1/models/models";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: "root",
})
export class FinanceService {
  serverURL = environment.serverUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  isLoading = false;
  profile: FinancialProfile;
  loadProfile(me: User) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        this.profile = await this.http
          .get<FinancialProfile>(this.serverURL + "/api/financial_profile/me")
          .toPromise();
        this.isLoading = false;
        resolve();
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        this.isLoading = false;
        reject();
      }
    });
  }


}
