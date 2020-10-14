import { Component, OnInit } from '@angular/core';
import { Bid, Task } from 'src/app/interfaces/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list1',
  templateUrl: './list1.component.html',
  styleUrls: ['./list1.component.scss'],
})
export class List1Component implements OnInit {
constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.readMyTasks();
  }

  isLoading = true;
  tasks: Task[] = [];
  async readMyTasks() {
    this.isLoading = true;
    this.tasks = await this.taskService.readMyTasks(1).toPromise();
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
