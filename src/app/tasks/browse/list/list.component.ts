import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task, User } from 'src/app/interfaces/models';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  isLoading = true;
  subsLoading: Subscription;
  tasks: Task[];
  subsTasks: Subscription;

  me: User = null;

  async ngOnInit() {
    this.isLoading = this.taskService.isLoading;
    this.subsLoading = this.taskService.subjectLoading.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );

    this.taskService.readByFilter(null);
    this.subsTasks = this.taskService.subjectTasks.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );

    this.me = await this.userService.getMe();
  }

  ngOnDestroy() {
    this.subsTasks.unsubscribe();
  }

  onClickLoginToBid(event, task: Task) {
    this.router.navigate(["../../../login"]);
    event.stopPropagation();
    return false;
  }

  onClickEdit(event, task: Task) {
    this.router.navigate(["me/edit-task", task._id]);
    event.stopPropagation();
    return false;

  }

  onClickBid(event, task: Task) {
    // event.stopPropagation();
    // return false;
  }

}
