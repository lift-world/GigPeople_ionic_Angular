import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: "app-yes-no",
  templateUrl: "./yes-no.component.html",
  styleUrls: ["./yes-no.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YesNoComponent),
      multi: true,
    },
  ],
})
export class YesNoComponent implements ControlValueAccessor {
  @Input() strNo: string;
  @Input() strYes: string;

  handleSelect(val) {
    this.value = val;
    this.onChange(this.value);
  }

  constructor() {}
  ngOnInit() {}

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
