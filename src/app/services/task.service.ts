import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment"; 
import { Task } from '../interfaces/models';
import { TaskFilter } from '../interfaces/TaskFilter';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  serverURL = environment.serverUrl;

  isLoading: boolean;
  subjectLoading = new Subject<boolean>();

  tasks: Task[];
  subjectTasks = new Subject<Task[]>();

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  createOne(data, myfile: File) {
    this.isLoading = true;
    this.subjectLoading.next(true);

    const formData = new FormData;
    formData.append('taskData', JSON.stringify(data));
    formData.append('myfile', myfile, data.title);

    this.http
      .post(this.serverURL + '/api/task', formData)
      .subscribe((task:Task) => {
        this.tasks.unshift(task);
        this.subjectTasks.next(this.tasks);
        this.isLoading = false;
        this.subjectLoading.next(false);
      }, (err) => { 
        console.log(err);
        this.toastr.error("Server", err.error.message || err.message);
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
      console.log(tasks);
      this.tasks = tasks;
      this.subjectTasks.next(tasks);
      this.isLoading = false;
      this.subjectLoading.next(false);
    });
  }
}

