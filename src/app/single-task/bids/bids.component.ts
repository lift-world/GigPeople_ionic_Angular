import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bid, Task } from 'src/app/1/models/models';
import { ChatService } from 'src/app/1/services/chat.service';
import { ContractService } from 'src/app/1/services/contract.service';
import { TaskService } from 'src/app/1/services/task.service';
import { UserService } from 'src/app/1/services/user.service';
import { SingleTaskService } from '../1/single-task.service';
import { MatDialog } from "@angular/material/dialog";
import { ContractModalComponent } from './contract-modal/contract-modal.component';

@Component({
  selector: "app-bids",
  templateUrl: "./bids.component.html",
  styleUrls: ["./bids.component.scss"],
})
export class BidsComponent implements OnInit {
  constructor(
    public sss: SingleTaskService,
    private chatService: ChatService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  toggleOverflowBid(ddd) {
    if (ddd.style.height !== "fit-content") {
      ddd.style.height = "fit-content";
    } else {
      ddd.style.height = "150px";
    }
  }

  async onClickAward(bid: Bid) {
    this.openDialog(bid);
  }

  async onClickChat(bid: Bid) {
    this.chatService.startChatWith(bid.refBidder._id);
  }

  openDialog(bid: Bid) {
    const dialogRef = this.dialog.open(ContractModalComponent, {
      width: "500px",
      data: {
        employer: this.sss.me,
        worker: bid.refBidder,
        taskTitle: this.sss.task.title,
        isHourly: this.sss.task.isHourly,
        budget: bid.budget,
        duration: bid.duration,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const taskId = bid.refTask;
        const bidId = bid._id;
        const workerId = bid.refBidder._id;
        const employerId = this.sss.me._id;
        const { budget, isHourly, startDate, endDate, duration } = result;
        this.sss.awardBid({taskId, bidId, workerId, employerId, budget, isHourly, startDate, endDate, duration});
      }
    });
  }

  isAwarded(bid: Bid) {
    if (this.sss.task.refContract?.refWorker === bid.refBidder._id) return true;
    return false;
  }

}


