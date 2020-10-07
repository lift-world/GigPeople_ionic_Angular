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
  imagePreview: string;

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
        validators: [Validators.required],
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
      isHourly: new FormControl(null, {
        validators: [Validators.required],
      }),
      refSkills: new FormControl(null, {
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
          this.form.setValue({
            refCategory: task.refCategory,
            title: task.title,
            description: task.description,
            filePath: task.filePath,
            country: task.country,
            minBudget: task.minBudget,
            maxBudget: task.maxBudget,
            myfile: task.filePath,
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ myfile: file });
    this.form.get("myfile").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    if (this.mode === "create") {
      this.taskService.createOne(
        {
          title: this.form.value.title,
          description: this.form.value.description,
          refCategory: this.form.value.refCategory,
          country: this.form.value.country,
          minBudget: this.form.value.minBudget,
          maxBudget: this.form.value.maxBudget,
          refSkills: this.form.value.refSkills,
          isHourly: this.form.value.isHourly,
        },
        this.form.value.myfile
      );
    } else {
    }
  }
}


