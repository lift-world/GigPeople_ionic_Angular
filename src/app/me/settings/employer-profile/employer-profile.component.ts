import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployerProfileService } from 'src/app/services/employer-profile.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss'],
})
export class EmployerProfileComponent implements OnInit, OnDestroy {

  constructor(private profileService: EmployerProfileService) { }

  isLoading = true;
  profile = null;
  subsProfile: Subscription;

  myForm: FormGroup;
  ngOnInit() {
    this.initForm();

    this.isLoading = this.profileService.isLoading;
    this.profile = this.profileService.me;
    this.updateForm(this.profile);

    if (this.profile === null && this.isLoading !== true) {
      this.profileService.getMe();
    }

    this.subsProfile = this.profileService.subjectMe.subscribe(({ me, isLoading }) => {
      this.isLoading = isLoading;
      this.profile = me;
      this.updateForm(this.profile);
    });
  }

  ngOnDestroy() {
    console.log('destroy');
    this.subsProfile.unsubscribe();
  }

  initForm() {
    this.myForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  updateForm(data) {
    if (!data) return;
    this.myForm.setValue({
      title: data.title,
      description: data.description
    });
  }
  
  onSubmit() {
    if (!this.myForm.valid) return;
    this.profileService.updateMe({
      title: this.myForm.value.title,
      description: this.myForm.value.description,
    });
  }
}
