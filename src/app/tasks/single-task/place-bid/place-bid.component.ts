import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.scss'],
})
export class PlaceBidComponent implements OnInit {
  @Input() minBudget;
  @Output() handleSubmit = new EventEmitter <{budget:number, duration: number, description: string}>();
  constructor() { }

  ngOnInit() { 
    this.initForm();
  }

  form: FormGroup;
  initForm() { 
    this.form = new FormGroup({
      budget: new FormControl(this.minBudget||0, {
        validators: [Validators.required],
      }),
      duration: new FormControl(7, {
        validators: [Validators.required],
      }),
      description: new FormControl("", {
        validators: [Validators.required],
      }),
    });
  }

  onSubmit() { 
    if (this.form.invalid) return;
    this.handleSubmit.emit(this.form.value);
  }
  
}
