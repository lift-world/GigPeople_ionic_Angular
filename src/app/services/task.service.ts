import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment"; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  serverURL = environment.serverUrl;

  isLoading: boolean;
  subjectLoading = new Subject<boolean>();

  tasks: Task[];
  subjectTasks = new Subject<Task[]>();

  constructor(private http: HttpClient) { }

  createOne(task: Task, myfile: File) {
    this.isLoading = true;
    this.subjectLoading.next(true);

    const formData = new FormData;
    formData.append('taskData', JSON.stringify(task));
    formData.append('myfile', myfile, task.title);

    this.http
      .post(this.serverURL + '/api/task', formData)
      .subscribe((task:Task) => {
        this.tasks.unshift(task);
        this.subjectTasks.next(this.tasks);
        this.isLoading = false;
        this.subjectLoading.next(false);
      });
  }

  getOne(id: string) {
    return this.http.get<Task>(this.serverURL + "/api/task/" + id);
  }

  readByFilter(taskFilter: TaskFilter) {
    this.isLoading = true;
    this.subjectLoading.next(true);

    this.http.post<Task[]>(this.serverURL + "/api/task/readbyfilter", taskFilter).subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.subjectTasks.next(tasks);
      this.isLoading = false;
      this.subjectLoading.next(false);
    });
  }
}

export interface Task {
  _id: string;
  refCreator: string;
  refCategory: string;
  refSkills: string[];
  title: string;
  description: string;
  filePath: string;
  country: string;
  minBudget: number;
  maxBudget: number;
  isHourly: boolean;
  refBids: string[];
  status: number;
  timestamp: Date;
}

export interface TaskFilter {
  location: string;
  category: string;
  keywords: string[];
  minFixed: number;
  maxFixed: number;
  minHourly: number;
  maxHourly: number;
  skills: string[];
}
