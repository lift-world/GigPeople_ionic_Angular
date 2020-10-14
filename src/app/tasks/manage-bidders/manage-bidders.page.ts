import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task } from 'src/app/interfaces/models';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: "app-manage-bidders",
  templateUrl: "./manage-bidders.page.html",
  styleUrls: ["./manage-bidders.page.scss"],
})
export class ManageBiddersPage implements OnInit {
  constructor(private route: ActivatedRoute, private taskService: TaskService,) {}
  taskId: string;
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("taskId")) {
        this.taskId = paramMap.get("taskId");
        this.readTask(this.taskId);
      }
    });
  }

  task: Task;
  async readTask(taskId) {
    this.task = await this.taskService.readOneWithRefs(taskId, [
      "refBids_refBidder",
    ]).toPromise();
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
