import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit, OnDestroy {
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
    });
  }

  isOK: boolean = false;
  handleRecaptcha(isOK: boolean) {
    this.isOK = isOK;
  }

  onSubmit() {
    if (this.isOK && this.form.valid) { 
      this.authService.login(this.form.value.email, this.form.value.password);
    }
  }
}
