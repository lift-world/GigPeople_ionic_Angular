import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Task, User } from 'src/app/1/models/models';
import { BidService } from 'src/app/1/services/bid.service';
import { TaskService } from 'src/app/1/services/task.service';
import { UserService } from 'src/app/1/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
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

    this.route.parent.paramMap.subscribe((paramMap: ParamMap) => {
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
