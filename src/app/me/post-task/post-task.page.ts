import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { Category, Skill, Task } from 'src/app/interfaces/models';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: "app-post-task",
  templateUrl: "./post-task.page.html",
  styleUrls: ["./post-task.page.scss"],
})
export class PostTaskPage implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;

  task: Task;
  form: FormGroup;

  private mode = "create";
  private taskId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      refCategory: new FormControl(null, {
        validators: [Validators.required],
      }),
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      filePath: new FormControl(null, {
        // validators: [Validators.required],
        // asyncValidators: [mimeType]
      }),
      country: new FormControl(null, {
        validators: [Validators.required],
      }),
      minBudget: new FormControl(null, {
        validators: [Validators.required],
      }),
      maxBudget: new FormControl(null, {
        validators: [Validators.required],
      }),
      isHourly: new FormControl(false, {
        validators: [Validators.required],
      }),
      refSkills: new FormControl([], {
        validators: [Validators.required],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("taskId")) {
        this.mode = "edit";
        this.taskId = paramMap.get("taskId");
        this.isLoading = true;
        this.taskService.getOne(this.taskId).subscribe((task) => {
          this.isLoading = false;
          this.task = task;
          console.log(task);
          this.form.setValue({
            refCategory: task.refCategory,
            title: task.title,
            description: task.description,
            filePath: task.filePath,
            country: task.country,
            minBudget: task.minBudget,
            maxBudget: task.maxBudget,
            isHourly: task.isHourly,
            refSkills: task.refSkills
          });
        });
      } else {
        this.mode = "create";
        this.taskId = null;
      }
    });
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    if (this.mode === "create") {
      this.taskService.createOne(this.form.value);
    } else {
      this.taskService.updateOne({ _id: this.task._id, ...this.form.value });
    }
  }
}


