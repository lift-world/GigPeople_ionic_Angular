import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService, Task } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(private taskService: TaskService) { }

  tasks: Task[];
  subsTasks: Subscription;
  ngOnInit(): void {
    this.taskService.readByFilter(null);
    this.subsTasks = this.taskService.subjectTasks.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      console.log(tasks);
    });
  }

  ngOnDestroy() { 
    this.subsTasks.unsubscribe();
  }

}
