import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-contract-modal",
  templateUrl: "./contract-modal.component.html",
  styleUrls: ["./contract-modal.component.scss"],
})
export class ContractModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ContractModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  startDate = Date.now();
  onYesClick(): void { 
    const endDate = this.endDate(this.data.duration);
    this.dialogRef.close({ ...this.data, startDate: this.startDate, endDate });
  }
  
  endDate(duration) {
    return (Date.now() + 1000 * 3600 * 24 * duration);
  }

}
