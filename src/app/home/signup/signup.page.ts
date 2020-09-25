import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit, OnDestroy {
  constructor(private authService:AuthService) {}

  isLoading: boolean = false;
  subsLoading: Subscription;
  ngOnInit() {
    this.isLoading = this.authService.isLoading;
    this.subsLoading = this.authService.subjectLoading.subscribe(isLoading => { 
      this.isLoading = isLoading;
    });

    this.initForm();
  }

  ngOnDestroy(): void { 
    this.subsLoading.unsubscribe();
  }

  form: FormGroup;
  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      confirm: new FormControl(null, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      }),
      country: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  isOK: boolean = false;
  handleRecaptcha(isOK: boolean) {
    this.isOK = isOK;
  }

  onSubmit() {
    console.log(this.isOK, this.form.valid);
    if (this.isOK && this.form.valid) { 
      this.authService.createUser(
        this.form.value.email,
        this.form.value.password,
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.country
      );
    }
  }
}
