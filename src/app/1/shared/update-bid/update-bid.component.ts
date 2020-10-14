import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bid } from 'src/app/1/models/models';
import { BidService } from 'src/app/1/services/bid.service';

@Component({
  selector: "app-update-bid",
  templateUrl: "./update-bid.component.html",
  styleUrls: ["./update-bid.component.scss"],
})
export class UpdateBidComponent implements OnInit {
  constructor(
    private bidService: BidService,
    public dialogRef: MatDialogRef<UpdateBidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bid
  ) {}

  ngOnInit() {
    this.initForm();
  }

  form: FormGroup;
  initForm() {
    this.form = new FormGroup({
      budget: new FormControl(this.data.budget, {
        validators: [Validators.required],
      }),
      duration: new FormControl(this.data.duration, {
        validators: [Validators.required],
      }),
      description: new FormControl(this.data.description, {
        validators: [Validators.required],
      }),
    });
  }

  async onSubmit() {
    if (this.form.invalid) return;
    const bid = await this.bidService
      .updateOne({
        id: this.data._id,
        budget: this.form.value.budget,
        duration: this.form.value.duration,
        description: this.form.value.description,
      })
      .toPromise();

    this.dialogRef.close(bid);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
