import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bid, BidService } from 'src/app/services/bid.service';

import { Task, TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.page.html',
  styleUrls: ['./single-task.page.scss'],
})
export class SingleTaskPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private bidService: BidService
  ) { }

  isLoading: boolean = true;
  taskId: string;
  task: Task;
  bids: Bid[];

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // if (paramMap.has('taskId')) {}
      this.taskId = paramMap.get('taskId');
      this.isLoading = true;
      this.taskService.getOne(this.taskId).subscribe((task) => {
        this.isLoading = false;
        this.task = task;
      });

      this.bidService.readByTaskId(this.taskId).subscribe((bids) => {
        this.bids = bids;
      });
    });
  }



  onClickCreateBid() {
    // this.bidService.createOne({
    //   _id: null,
    //   bidderId: null,
    //   taskId: this.taskId,
    //   description: "hellos was12234131fytds",
    //   budget: 3000,
    //   duration: 30
    // }).subscribe(bid => {
    //   this.bids = [bid, ...this.bids];
    // });
  }

  handlerDelete(bid: Bid) {
    this.bidService.deleteOne(bid._id).subscribe(resp => {
      console.log(resp);
      let k = this.bids.findIndex((bb) => bid._id === bb._id);
      if (k > -1) {
        this.bids.splice(k, 1);
      }
    });
  }
}
