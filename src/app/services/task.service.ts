import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment"; 
import { Task } from '../interfaces/models';
import { TaskFilter } from '../interfaces/TaskFilter';

@Injectable({
  providedIn: "root",
})
export class TaskService {
  serverURL = environment.serverUrl;

  isLoading: boolean;
  subjectLoading = new Subject<boolean>();

  tasks: Task[] = [];
  subjectTasks = new Subject<Task[]>();

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  createOne(data) {
    this.isLoading = true;
    this.subjectLoading.next(true);

    this.http.post(this.serverURL + "/api/task", data).subscribe(
      (task: Task) => {
        this.tasks.unshift(task);
        this.subjectTasks.next(this.tasks);
        this.isLoading = false;
        this.subjectLoading.next(false);
        this.toastr.success("Posted successfully!", "Task");
        this.router.navigate(["/my-tasks/employer/open-tasks"]);
      },
      (err) => {
        console.log(err);
        this.toastr.error("Server", err.error.message || err.message);
        this.isLoading = false;
        this.subjectLoading.next(false);
      }
    );
  }

  updateOne(data) {
    this.isLoading = true;
    this.subjectLoading.next(true);

    this.http.put(this.serverURL + "/api/task", data).subscribe(
      (task: Task) => {
        let k = this.tasks.findIndex(x => x._id === task._id);
        if(k>-1) this.tasks[k] = task;
        this.subjectTasks.next(this.tasks);

        this.isLoading = false;
        this.subjectLoading.next(false);

        this.toastr.success("Updated successfully!", "Task");
        this.router.navigate(["/my-tasks/employer/open-tasks"]);

      },
      (err) => {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
        this.isLoading = false;
        this.subjectLoading.next(false);
      }
    );
  }

  getOne(id: string) {
    return this.http.get<Task>(this.serverURL + "/api/task/" + id);
  }

  readByFilter(taskFilter: TaskFilter) {
    this.isLoading = true;
    this.subjectLoading.next(true);

    this.http
      .post<Task[]>(this.serverURL + "/api/task/readbyfilter", taskFilter)
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.subjectTasks.next(tasks);
        this.isLoading = false;
        this.subjectLoading.next(false);
      });
  }

  readOneWithRefs(id: string, refs: string[]) {
    return this.http.post<Task>(this.serverURL + "/api/task/readOneWithRefs", {id, refs});
  }

  readMyTasks(status) {
    return this.http.post<Task[]>(this.serverURL + "/api/task/readMyTasks", {status});
  }

  deleteOne(id) {
    return this.http.post(this.serverURL + "/api/task/delete", { id });
  }

  async hire(taskId, bidderId) {
    return new Promise(async(resolve, reject) => { 
      try {
        let result = await this.http.post(this.serverURL + "/api/task/hire", { taskId, bidderId }).toPromise();

        
        resolve();
      } catch (err) {
        console.log(err);
        this.toastr.error(err.error.message || err.message, "Server");
      }
    });
  }
}

