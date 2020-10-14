import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/1/models/models';

@Component({
  selector: "app-about-employer",
  templateUrl: "./about-employer.component.html",
  styleUrls: ["./about-employer.component.scss"],
})
export class AboutEmployerComponent implements OnInit {
  @Input() employer: User;

  constructor() {}

  ngOnInit() { }
  currentRate = 3.41;
}
