import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployerReview, WorkerReview } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ReviewService {
  serverURL = environment.serverUrl;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  async loadWorkerReviewByTaskId(taskId) {
    return new Promise<WorkerReview>(async (resolve, reject) => {
      try {
        const review = await this.http
          .post<WorkerReview>(
            this.serverURL + "/api/worker_review/readByTaskId",
            { taskId }
          )
          .toPromise();
        resolve(review);
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        reject();
      }
    });
  }

  async loadEmployerReviewByTaskId(taskId) {
    return new Promise<EmployerReview>(async (resolve, reject) => {
      try {
        const review = await this.http
          .post<EmployerReview>(
            this.serverURL + "/api/employer_review/readByTaskId",
            { taskId }
          )
          .toPromise();
        resolve(review);
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        reject();
      }
    });
  }

  async createEmployerReview(review: EmployerReview) {
    return new Promise<EmployerReview>(async (resolve, reject) => {
      try {
        const resp = await this.http
          .post<EmployerReview>(this.serverURL + "/api/employer_review/", {
            review,
          })
          .toPromise();
        resolve(resp);
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        reject();
      }
    });
  }

  async createWorkerReview(review: WorkerReview) {
    return new Promise<WorkerReview>(async (resolve, reject) => {
      try {
        const resp = await this.http
          .post<WorkerReview>(this.serverURL + "/api/worker_review/", {
            review,
          })
          .toPromise();
        resolve(resp);
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        reject();
      }
    });
  }
}
