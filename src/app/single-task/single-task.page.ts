import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Task, User } from 'src/app/1/models/models';
import { BidService } from 'src/app/1/services/bid.service';

import { TaskService } from 'src/app/1/services/task.service';
import { UserService } from 'src/app/1/services/user.service';
import { SingleTaskService } from './1/single-task.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.page.html',
  styleUrls: ['./single-task.page.scss'],
})
export class SingleTaskPage implements OnInit {
  links = [
    {title: "Details", url:'details'},
    {title: "Bids", url:'bids'},
    {title: "Contract", url:'contract'},
    {title: "Review", url:'review'},
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public sss: SingleTaskService
  ) { }

  isLoading: boolean = true;
  ngOnInit() {
    this.isLoading = true;
    this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      // if (paramMap.has('taskId')) {}
      const taskId = paramMap.get('taskId');
      await this.sss.loadTask(taskId);
      await this.sss.loadMe();
      this.isLoading = false;
    });
  }

  isMyProject() {
    return this.sss.me._id === this.sss.task.refCreator._id;
  }
}
