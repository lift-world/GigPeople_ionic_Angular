import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Bid } from 'src/app/interfaces/models';
import { BidService } from 'src/app/services/bid.service';
import { UpdateBidComponent } from 'src/app/shared/update-bid/update-bid.component';

@Component({
  selector: 'app-list0',
  templateUrl: './list0.component.html',
  styleUrls: ['./list0.component.scss'],
})
export class List0Component implements OnInit {
  constructor(private bidService: BidService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getBids();
  }

  isLoading = true;
  bids: Bid[] = [];
  async getBids() {
    this.isLoading = true;
    this.bids = await this.bidService.readMyActiveBids().toPromise();
    this.isLoading = false;
  }

  onClickEdit(bid: Bid, i) {
    const dialogRef = this.dialog.open(UpdateBidComponent, {
      data: bid,
    });

    dialogRef.afterClosed().subscribe(this.onUpdate(i));

    return false;
  }

  onUpdate(i) {
    return (result: Bid) => {
      if (!result) return;
      this.bids[i].budget = result.budget;
      this.bids[i].duration = result.duration;
      this.bids[i].description = result.description;
    };
  }

  async onClickDelete(bid: Bid, i) {
    await this.bidService.deleteOne(bid._id).toPromise();
    this.bids.splice(i, 1);

    return false;
  }

}
