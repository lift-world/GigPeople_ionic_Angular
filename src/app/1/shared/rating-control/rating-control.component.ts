import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-rating-control",
  templateUrl: "./rating-control.component.html",
  styleUrls: ["./rating-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
})
export class RatingControlComponent implements OnInit {
  @Input() rate: number;

  constructor() {}
  ngOnInit() {}

  handleNgbRateChanged(val) {
    this.value = val;
    this.onChange(this.value);
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
