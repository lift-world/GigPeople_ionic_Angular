import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-yes-no',
  templateUrl: './yes-no.component.html',
  styleUrls: ['./yes-no.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YesNoComponent),
    multi: true
  }]
})
export class YesNoComponent implements ControlValueAccessor {
  @Input() strNo: string;
  @Input() strYes: string;
  
  value = false;
  onChange = (_: any) => { };

  handleSelect(val) {
    this.value = val;
    this.onChange(this.value);
  }

  constructor() { }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange(this.value);    
  }
  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit() {}

}
