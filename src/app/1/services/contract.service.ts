import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { Contract } from '../models/models';

@Injectable({
  providedIn: "root",
})
export class ContractService {
  serverURL = environment.serverUrl;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  isLoading = false;
  async createOne({
    employerId,
    workerId,
    taskId,
    budget,
    isHourly,
    deadline,
  }) {
    this.isLoading = true;
    try {
      let contract = this.http
        .post(this.serverURL + "/contract/create", {
          employerId,
          workerId,
          taskId,
          budget,
          isHourly,
          deadline,
        })
        .toPromise();
      
    } catch (err) {
      this.toastr.error("Server", err.error.message || err.message);
      this.isLoading = false;
    }
  }

  readMyContracts({ isEmployer , status }) { 
    return new Promise<Contract[]>(async (resolve, reject) => {
      try {
        let contracts = await this.http
          .post<Contract[]>(this.serverURL + "/api/contract/readMyContracts", {isEmployer, status})
          .toPromise();
        resolve(contracts);
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        reject();
      }
    });
  }
}


