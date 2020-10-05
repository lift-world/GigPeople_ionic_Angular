import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Task, TaskService } from 'src/app/services/task.service';
// import { mimeType } from "../../shared/mime-type.validator";
interface Food {
  _id: string;
  title: string;
}

@Component({
  selector: 'app-post-task',
  templateUrl: './post-task.page.html',
  styleUrls: ['./post-task.page.scss'],
})
export class PostTaskPage implements OnInit, AfterViewInit {
  foods: Food[] = [
    { _id: '0', title: 'Admin Support' },
    { _id: '1', title: 'Customer Service' },
    { _id: '2', title: 'Data Analytics' },
    { _id: '3', title: 'Design & Creative' },
    { _id: '4', title: 'Legal' },
    { _id: '5', title: 'Software Developing' },
    { _id: '6', title: 'IT & Networking' },
    { _id: '7', title: 'Writing' },
    { _id: '8', title: 'Translation' },
    { _id: '9', title: 'Sales & Marketing' },
  ];

  isLoading = false;
  imagePreview: string;

  task: Task;
  form: FormGroup;
  private mode = "create";
  private taskId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { }

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
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("taskId")) {
        this.mode = "edit";
        this.taskId = paramMap.get("taskId");
        this.isLoading = true;
        this.taskService.getOne(this.taskId).subscribe(task => {
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
            isHourly: task.isHourly ? "true" : "false"
          });
        });
      } else {
        this.mode = "create";
        this.taskId = null;
      }
    });
  }

  ngAfterViewInit(): void { }

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
    if (this.mode === 'create') {
      const task: Task = {
        _id: null,
        refCreator: null,
        title: this.form.value.title,
        description: this.form.value.description,
        filePath: null,
        refCategory: this.form.value.refCategory,
        country: this.form.value.country,
        minBudget: this.form.value.minBudget,
        maxBudget: this.form.value.maxBudget,
        refSkills: [],
        isHourly: this.form.value.isHourly === "true",
        refBids: [],
        status: 0,
        timestamp: new Date()
      };

      this.taskService.createOne(task, this.form.value.myfile);

    } else {
    }
  }
}


