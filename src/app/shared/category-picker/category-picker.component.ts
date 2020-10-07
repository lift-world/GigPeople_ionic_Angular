import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/models';
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-category-picker",
  templateUrl: "./category-picker.component.html",
  styleUrls: ["./category-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoryPickerComponent),
      multi: true,
    },
  ],
})
export class CategoryPickerComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  constructor(private dataService: DataService) {}

  categories: Category[] = [];
  private subsLoadingData: Subscription;
  ngOnInit() {
    this.categories = this.dataService.categories;
    this.subsLoadingData = this.dataService.subjectLoading.subscribe(
      (isLoading) => {
        if (isLoading === false) {
          this.categories = this.dataService.categories;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subsLoadingData.unsubscribe();
  }
  
  handleSelect(event) {
    const value = this.categories.find((x) => x._id === event.target.value);
    this.updateValue(value);
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
