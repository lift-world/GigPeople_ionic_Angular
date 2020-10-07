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
    this.value = this.countries.find(x => x.code === event.target.value);
    this.onChange(this.value);
  }

  // no touch below
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
