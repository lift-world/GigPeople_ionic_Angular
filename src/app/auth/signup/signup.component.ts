import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";
import { Country } from 'src/app/interfaces/Country';
import * as countryList from "country-list";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit, OnDestroy {
  arrCountry: Country[];
  constructor(private authService: AuthService) {}

  isLoading: boolean = false;
  subsLoading: Subscription;
  ngOnInit() {
    this.arrCountry = countryList.getData();

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
      email: new FormControl("nick@gmail.com", {
        validators: [Validators.required],
      }),
      password: new FormControl("1", {
        validators: [Validators.required],
      }),
      confirm: new FormControl("1", {
        validators: [Validators.required],
      }),
      firstName: new FormControl("Nick", {
        validators: [Validators.required],
      }),
      lastName: new FormControl("Wild", {
        validators: [Validators.required],
        // asyncValidators: [mimeType]
      }),
      country: new FormControl("US", {
        validators: [Validators.required],
      }),
    });
  }

  isOK: boolean = true;
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
