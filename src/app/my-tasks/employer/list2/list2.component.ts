import { Component, OnInit } from '@angular/core';
import { Contract_Status } from 'src/app/1/models/enums';
import { Bid, Contract, Task } from 'src/app/1/models/models';
import { ContractService } from 'src/app/1/services/contract.service';
import { TaskService } from 'src/app/1/services/task.service';

@Component({
  selector: "app-list2",
  templateUrl: "./list2.component.html",
  styleUrls: ["./list2.component.scss"],
})
export class List2Component implements OnInit {
  constructor(private contractService: ContractService) {}

  isLoading = true;
  contracts: Contract[] = [];
  async ngOnInit() {
    this.isLoading = true;
    this.contracts = await this.contractService.readMyContracts({
      isEmployer: true,
      status: Contract_Status.RELEASED,
    });
    this.isLoading = false;
  }
}
