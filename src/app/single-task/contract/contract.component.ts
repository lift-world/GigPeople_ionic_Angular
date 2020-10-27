import { Component, OnInit } from '@angular/core';
import { Contract_Status } from 'src/app/1/models/enums';
import { SingleTaskService } from '../1/single-task.service';

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit {
  Contract_Status = Contract_Status;
  constructor(public sss: SingleTaskService) {}

  ngOnInit() {}

  workerName(workerId) {
    let worker = this.sss.me._id === workerId ? this.sss.me : null;

    if (!worker) {
      let bid = this.sss.task.refBids.find(
        (bid) => bid.refBidder._id === workerId
      );
      worker = bid.refBidder;
    }
    return worker.firstName + " " + worker.lastName;
  }

  onClickAccept() {
    this.sss.acceptContract(this.sss.task.refContract._id);
  }

  onClickRequestRelease() {}

  onClickRelease() { 
    this.sss.releaseContract(this.sss.task.refContract._id);
  }
}
