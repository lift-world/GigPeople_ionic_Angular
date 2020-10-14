import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  isLoading: boolean = false;
  subsLoading: Subscription;
  ngOnInit() {
    this.isLoading = this.authService.isLoading;
    this.subsLoading = this.authService.subjectLoading.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );

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
    this.form.setValue({
      email: "nickwild@gmail.com",
      password: "1",
    });
  }

  isOK: boolean = true;
  handleRecaptcha(isOK: boolean) {
    this.isOK = isOK;
  }

  onSubmit() {
    if (this.isOK && this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password);
    }
  }
}
