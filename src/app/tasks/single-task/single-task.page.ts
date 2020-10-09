import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Task, User } from 'src/app/interfaces/models';
import { BidService } from 'src/app/services/bid.service';

import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.page.html',
  styleUrls: ['./single-task.page.scss'],
})
export class SingleTaskPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private bidService: BidService,
    private userService: UserService
  ) { }

  me: User;
  isLoading: boolean = true;
  taskId: string;
  task: Task;

  async ngOnInit() {
    this.me = await this.userService.getMe();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      // if (paramMap.has('taskId')) {}
      this.taskId = paramMap.get('taskId');
      this.isLoading = true;

      this.taskService.readOneWithRefs(this.taskId, ["refCreator", "refSkills", "refBids"]).toPromise().then((task: Task) => { 
        this.isLoading = false;
        this.task = task;
      }).catch(err => {
        this.isLoading = false;
        console.log(err);
      });

    });
  }

  isMyProject(me:User, task:Task) {
    return me?._id === task?.refCreator?._id;
  }

  alreadyBid(me:User, task:Task) {
    let k = task.refBids.findIndex(x => x.refBidder === me._id);
    return k > -1;
  }

  handleSubmitBid({ budget, duration, description }) {
    const taskId = this.taskId;
    this.bidService
      .createOne({ taskId, budget, duration, description })
      .subscribe((bid) => {
        this.task.refBids.unshift(bid);
      });
  }
}
