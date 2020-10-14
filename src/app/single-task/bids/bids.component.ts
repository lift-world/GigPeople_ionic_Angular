import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Bid, Task } from 'src/app/1/models/models';
import { TaskService } from 'src/app/1/services/task.service';
import { SingleTaskService } from '../1/single-task.service';

@Component({
  selector: "app-bids",
  templateUrl: "./bids.component.html",
  styleUrls: ["./bids.component.scss"],
})
export class BidsComponent implements OnInit {
  constructor(
    public sss: SingleTaskService
  ) { }

  ngOnInit() {
  }

  toggleOverflowBid(ddd) { 
    if (ddd.style.height !== "fit-content") {    
      ddd.style.height = 'fit-content';
    } else {
      ddd.style.height = '150px';
    }
  }

  async onClickAward(bid: Bid) {
    
  }

  async onClickChat(bid: Bid) {
    
  }
}
