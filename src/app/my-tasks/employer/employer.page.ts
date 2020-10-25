import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.page.html',
  styleUrls: ['./employer.page.scss'],
})
export class EmployerPage implements OnInit {
  links = [
    {title: "Open Tasks", url:'open-tasks'},
    {title: "Current Contracts", url:'work-in-progress'},
    {title: "Past Contracts", url:'past-tasks'},
  ];

  constructor(public route: ActivatedRoute, public router: Router) {}
  ngOnInit() {}

}
