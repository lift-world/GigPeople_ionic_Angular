import { Component, OnInit } from '@angular/core';
import { BidService } from 'src/app/1/services/bid.service';
import { SingleTaskService } from '../1/single-task.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private bidService: BidService,
    public sss: SingleTaskService
  ) { }

  ngOnInit() { }

  isMyProject() {
    return this.sss.me._id === this.sss.task.refCreator._id;
  }

  alreadyBid() {
    let k = this.sss.task.refBids.findIndex(x => x.refBidder._id === this.sss.me._id);
    return k > -1;
  }

  handleSubmitBid({ budget, duration, description }) {
    const taskId = this.sss.taskId;
    this.bidService
      .createOne({ taskId, budget, duration, description })
      .subscribe((bid) => {
        this.sss.task.refBids.unshift(bid);
      });
  }
}
