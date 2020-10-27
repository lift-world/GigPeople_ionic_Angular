import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bid, Task, User } from 'src/app/1/models/models';
import { TaskService } from 'src/app/1/services/task.service';
import { UserService } from 'src/app/1/services/user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SingleTaskService {
  serverURL = environment.serverUrl;
  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  isLoading: boolean = true;
  taskId;
  task: Task;
  async loadTask(taskId = this.taskId) {
    if (!taskId) return;
    this.taskId = taskId;
    try {
      this.isLoading = true;
      this.task = await this.taskService
        .readOneWithRefs(taskId, [
          "refCreator",
          "refSkills",
          "refBids_refBidder",
          "refContract"
        ])
        .toPromise();
      this.isLoading = false;
    } catch (err) {
      console.log(err);
      this.toastr.error(err.error.message || err.message, "Server");
      this.isLoading = false;
    }
  }

  me: User;
  async loadMe() {
    try {
      this.isLoading = true;
      this.me = await this.userService.getMe();
      this.isLoading = false;
    } catch (err) {
      console.log(err);
      this.toastr.error(err.error.message || err.message, "Server");
      this.isLoading = false;
    }
  }

  async awardBid({ taskId, bidId, workerId, employerId, isHourly, budget, startDate, endDate, duration }) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        let contract = await this.http
          .post(this.serverURL + "/api/contract/awardBid", {
            taskId,
            bidId,
            workerId,
            employerId,
            isHourly, 
            budget,
            startDate,
            endDate,
            duration
          })
          .toPromise();

        await this.loadTask();
        resolve();
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
      }
    });
  }

  async acceptContract(idContract) { 
    return new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        let contract = await this.http
          .post(this.serverURL + "/api/contract/acceptContract", {
            idContract
          })
          .toPromise();

        await this.loadTask();
        resolve();
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
      }
    });
  }

  async releaseContract(idContract) {
    return new Promise(async (resolve, reject) => {
      try {
        this.isLoading = true;
        let contract = await this.http
          .post(this.serverURL + "/api/contract/release", {
            idContract,
          })
          .toPromise();

        await this.loadTask();
        resolve();
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
      }
    });
  }
}
