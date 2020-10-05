import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/interfaces/Country';
import { UserService } from 'src/app/services/user.service';
import * as countryList from "country-list";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit, AfterViewInit {
  constructor(private userService: UserService) {}

  me;
  subsMe: Subscription;
  arrCountry: Country[];
  userForm: FormGroup;

  ngOnInit() {
    this.arrCountry = countryList.getData();

    if (this.userService.me === null) this.userService.getMe();
    else this.me = this.userService.me;

    this.initUserForm(this.me);
    this.subsMe = this.userService.subjectMe.subscribe(({ me, isLoading }) => {
      this.me = me;
      this.initUserForm(this.me);
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.subsMe.unsubscribe();
  }

  initUserForm(me) {
    this.imagePreview = me?.avatar;
    this.userForm = new FormGroup({
      country: new FormControl(me?.country, {
        validators: [Validators.required],
      }),
      email: new FormControl(me?.email, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(me?.firstName, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(me?.lastName, {
        validators: [Validators.required],
      }),
      avatarFile: new FormControl(null, {
        // validators: [Validators.required],
      }),
    });
  }

  imagePreview: string;
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({ avatarFile: file });
    this.userForm.get("avatarFile").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmitUserForm() {
    if (!this.userForm.valid) return;
    this.userService.updateMe({
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      country: this.userForm.value.country,
      avatarFile: this.userForm.value.avatarFile,
    });
  }
}
