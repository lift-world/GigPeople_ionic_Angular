import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-badge-notify",
  templateUrl: "./badge-notify.component.html",
  styleUrls: ["./badge-notify.component.scss"],
})
export class BadgeNotifyComponent implements OnInit {
  @Input() isDropDown: boolean;
  @Output() handleClickIcon = new EventEmitter<any>();
  @Output() handleMouseLeave = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}
}
