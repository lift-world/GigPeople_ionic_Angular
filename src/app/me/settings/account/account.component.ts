import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/1/services/user.service';
import { Country } from 'src/app/1/models/Country';
import * as countryList from "country-list";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit, AfterViewInit {
  arrCountry: Country[];
  constructor(private userService: UserService) {}

  me;
  userForm: FormGroup;
  isLoading: boolean;
  ngOnInit() {
    this.arrCountry = countryList.getData();
    this.initForm();
    this.doInit();
  }

  async doInit() { 
    this.isLoading = true;
    this.me = await this.userService.getMe();
    this.updateForm(this.me);
    this.isLoading = false;
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}

  initForm() { 
    this.userForm = new FormGroup({
      country: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      avatarFile: new FormControl(null, {
        // validators: [Validators.required],
      }),
    });
  }

  updateForm(me) {
    if (!me) return;
    this.imagePreview = me.avatar;
    this.userForm.setValue({
      country: me.country,
      email: me.email,
      firstName: me.firstName,
      lastName: me.lastName,
      avatarFile: null,
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
