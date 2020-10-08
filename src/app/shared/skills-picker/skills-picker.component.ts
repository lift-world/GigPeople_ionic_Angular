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
export class SkillsPickerComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
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
    this.updateValue([]);
  }

  ngOnDestroy() {
    this.subsLoadingData.unsubscribe();
  }

  handleSelectSkill(refSkill) {
    this.value.push(refSkill);
    this.updateValue(this.value);
  }

  getSkillTitle(id) {
    let skill = this.skills.find(x => x._id === id);  
    if (skill == null) return "?";
    else return skill.title;
  }

  // no touch below
  updateValue(value) {
    this.value = value;
    this.onChange(value);
  }

  value;
  disabled = false;
  onChange = (_: any) => {};
  onTouched = (_: any) => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
