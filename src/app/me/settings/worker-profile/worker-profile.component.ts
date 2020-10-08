import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WorkerProfileService } from 'src/app/services/worker-profile.service';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.scss'],
})
export class WorkerProfileComponent implements OnInit, OnDestroy {

  constructor(private profileService: WorkerProfileService) { }

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
    this.subsProfile.unsubscribe();
  }

  initForm() {
    this.myForm = new FormGroup({
      hourlyRate: new FormControl(null, {
        validators: [Validators.required],
      }),
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        validators: [Validators.required],
      }),
      refSkills: new FormControl([], {
        validators: [Validators.required],
      }),
    });
  }

  updateForm(data) { 
    if (!data) return;
    this.myForm.setValue({
      hourlyRate: data.hourlyRate,
      title: data.title,
      description: data.description,
      refSkills: data.refSkills
    });
  }

  onSubmit() { 
    if (!this.myForm.valid) return;
    this.profileService.updateMe({
      hourlyRate: this.myForm.value.hourlyRate,
      title: this.myForm.value.title,
      description: this.myForm.value.description,
      refSkills: this.myForm.value.refSkills
    });
  }
}
