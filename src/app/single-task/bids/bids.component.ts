import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/app/1/models/models';
import { TaskService } from 'src/app/1/services/task.service';

@Component({
  selector: "app-bids",
  templateUrl: "./bids.component.html",
  styleUrls: ["./bids.component.scss"],
})
export class BidsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private taskService: TaskService,) {}
  taskId: string;
  ngOnInit() {
    this.route.parent.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("taskId")) {
        this.taskId = paramMap.get("taskId");
        this.readTask(this.taskId);
      }
    });
  }

  isLoading = true;
  task: Task;
  async readTask(taskId) {
    this.isLoading = true;
    this.task = await this.taskService.readOneWithRefs(taskId, [
      "refBids_refBidder",
    ]).toPromise();
    this.isLoading = false;
  }

  toggleOverflowBid(ddd) { 
    if (ddd.style.height !== "fit-content") {    
      ddd.style.height = 'fit-content';
    } else {
      ddd.style.height = '150px';
    }
  }

  async onClickAcceptOffer(bidderId) {
    const taskId = this.task._id;
    await this.taskService.hire(taskId, bidderId);
  }
}
