import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {

  currentUrl;
  constructor(public router: Router) { 
    this.currentUrl = router.url.split('/').includes('employer')?'employer':'freelancer';
  }

  ngOnInit() {
  }

}
