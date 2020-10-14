import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.page.html',
  styleUrls: ['./freelancer.page.scss'],
})
export class FreelancerPage implements OnInit {

  links = [
    {title: "Active Bids", url:'active-bids'},
    {title: "Current Tasks", url:'current-tasks'},
    {title: "Past Tasks", url:'past-tasks'},
  ];

  constructor(public route: ActivatedRoute, public router: Router) {
  }
  ngOnInit() {}
}
