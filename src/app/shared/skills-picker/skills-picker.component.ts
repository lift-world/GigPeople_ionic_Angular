import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/interfaces/models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: "app-skills-picker",
  templateUrl: "./skills-picker.component.html",
  styleUrls: ["./skills-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkillsPickerComponent),
      multi: true,
    },
  ],
})
export class SkillsPickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  skills: Skill[] = [];
  private subsLoadingData: Subscription;
  ngOnInit() {
    this.skills = this.dataService.skills;
    this.subsLoadingData = this.dataService.subjectLoading.subscribe(
      (isLoading) => {
        if (isLoading === false) {
          this.skills = this.dataService.skills;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subsLoadingData.unsubscribe();
  }

  refSkills: Skill[] = [];
  handleSelectSkill(skill) {
    let k = this.refSkills.findIndex((x) => x._id === skill._id);
    if (k > -1) return;
    this.refSkills.push(skill);

    this.updateValue(this.refSkills);
  }

  // no touch below
  updateValue(value) {
    this.value = value;
    this.onChange(value);
  }

  value;
  onChange = (_: any) => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange(this.value);
  }
  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}
}
