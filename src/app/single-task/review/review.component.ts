import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployerReview, User, WorkerReview } from 'src/app/1/models/models';
import { ReviewService } from 'src/app/1/services/review.service';
import { UserService } from 'src/app/1/services/user.service';
import { SingleTaskService } from '../1/single-task.service';

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    public sss: SingleTaskService,
    private userService: UserService
  ) {
    this.initForm();
    this.getUsers();
  }

  isLoading = true;
  employerReview: EmployerReview;
  workerReview: WorkerReview;
  async ngOnInit() {
    this.isLoading = true;
    this.employerReview = await this.reviewService.loadEmployerReviewByTaskId(
      this.sss.taskId
    );
    this.workerReview = await this.reviewService.loadWorkerReviewByTaskId(
      this.sss.taskId
    );
    this.isLoading = false;
  }

  iAmWorker() {
    return this.sss.task.refContract.refWorker === this.sss.me._id;
  }

  iAmEmployer() {
    return this.sss.task.refContract.refEmployer === this.sss.me._id;
  }

  formForEmployer: FormGroup;
  formForWorker: FormGroup;
  initForm() {
    this.formForEmployer = new FormGroup({
      star: new FormControl(0, {
        validators: [Validators.required]
      }),
      description: new FormControl("", {
        validators: [Validators.required],
      }),
    });

    this.formForWorker = new FormGroup({
      star: new FormControl(0, {
        validators: [Validators.required],
      }),
      starOnTime: new FormControl(0, {
        validators: [Validators.required],
      }),
      starOnBudget: new FormControl(0, {
        validators: [Validators.required],
      }),
      description: new FormControl("", {
        validators: [Validators.required],
      }),
    });
  }

  worker: User;
  employer: User;

  async getUsers() { 
    this.worker = await this.userService.getUserById(this.sss.task.refContract.refWorker);
    this.employer = await this.userService.getUserById(this.sss.task.refContract.refEmployer);
  }

  async onSubmit() {
    if (this.iAmWorker()) { 
      let review: EmployerReview = {
        _id: null,
        refTask: this.sss.taskId,
        refWorker: this.sss.me._id,
        refEmployer: this.sss.task.refContract.refEmployer,
        star: this.formForEmployer.value.star,
        description: this.formForEmployer.value.description,
        timestamp: null
      };

      review = await this.reviewService.createEmployerReview(review);
      this.employerReview = review;

    } else {
      let review: WorkerReview = {
        _id: null,
        refTask: this.sss.taskId,
        refWorker: this.sss.task.refContract.refWorker,
        refEmployer: this.sss.me._id,
        star: this.formForWorker.value.star,
        starOnBudget: this.formForWorker.value.starOnBudget,
        starOnTime: this.formForWorker.value.starOnTime,
        description: this.formForWorker.value.description,
        timestamp: null,
      };
      
      review = await this.reviewService.createWorkerReview(review);
      this.workerReview = review;
    }
  }
}
