import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-gcs-uploader",
  templateUrl: "./gcs-uploader.component.html",
  styleUrls: ["./gcs-uploader.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GcsUploaderComponent),
      multi: true,
    },
  ],
})
export class GcsUploaderComponent
  implements ControlValueAccessor, OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}

  imagePreview: string;

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  

  // no touch below
  updateValue(value) {
    this.value = value;
    this.onChange(value);
  }

  value;
  disabled = false;
  onChange = (_: any) => {};
  onTouched = (_: any)=>{ };

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
