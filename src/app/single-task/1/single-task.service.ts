import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task, User } from 'src/app/1/models/models';
import { TaskService } from 'src/app/1/services/task.service';
import { UserService } from 'src/app/1/services/user.service';

@Injectable()
export class SingleTaskService {

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  isLoading: boolean = true;
  taskId;
  task: Task;
  async loadTask(taskId = this.taskId) {
    this.taskId = taskId;
    try {
      this.isLoading = true;
      this.task = await this.taskService.readOneWithRefs(
        taskId, ["refCreator", "refSkills", "refBids_refBidder"]
      ).toPromise();
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

  async awardToBidder(bidderId) {

  }
}
