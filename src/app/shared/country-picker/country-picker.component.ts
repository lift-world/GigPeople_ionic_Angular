import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Country } from "src/app/interfaces/Country";
import * as countryList from "country-list";

@Component({
  selector: "app-country-picker",
  templateUrl: "./country-picker.component.html",
  styleUrls: ["./country-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryPickerComponent),
      multi: true,
    },
  ],
})
export class CountryPickerComponent implements ControlValueAccessor, OnInit {
  constructor() {}
  ngOnInit() {
    this.countries = countryList.getData();
  }

  countries: Country[] = [];

  handleSelect(event) {
    const val = event.target.value;
    this.updateValue(val);
  }

  updateValue(val) {
    this.value = val;
    this.onChange(val);
  }

  // no touch below

  value=null;
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
