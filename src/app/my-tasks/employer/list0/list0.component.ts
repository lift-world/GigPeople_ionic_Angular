import { Component, OnInit } from '@angular/core';
import { Bid, Task } from 'src/app/1/models/models';
import { TaskService } from 'src/app/1/services/task.service';

@Component({
  selector: 'app-list0',
  templateUrl: './list0.component.html',
  styleUrls: ['./list0.component.scss'],
})
export class List0Component implements OnInit {
  constructor(private taskService: TaskService) {}
  isLoading = true;
  ngOnInit() {
    this.readMyTasks();
  }

  tasks: Task[] = [];
  async readMyTasks() {
    this.isLoading = true;
    this.tasks = await this.taskService.readMyTasks(0).toPromise();
    this.isLoading = false;
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
