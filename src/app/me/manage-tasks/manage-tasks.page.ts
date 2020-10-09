import { Component, OnInit } from '@angular/core';
import { Bid, Task } from 'src/app/interfaces/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: "app-manage-tasks",
  templateUrl: "./manage-tasks.page.html",
  styleUrls: ["./manage-tasks.page.scss"],
})
export class ManageTasksPage implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.readMyTasks();
  }

  tasks: Task[] = [];
  async readMyTasks() {
    this.tasks = await this.taskService.readMyTasks().toPromise();
  }

  getAveBidBudget(bids: Bid[]) {
    if (bids.length === 0) return null;
    let sum = 0;
    bids.forEach((bid) => (sum += bid.budget));
    return Math.round((sum / bids.length) * 100) / 100;
  }

  async onClickDelete(task:Task, i) {
    await this.taskService.deleteOne(task._id).toPromise();
    this.tasks.splice(i, 1);
  }
}
