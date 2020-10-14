import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subscription, Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { Skill } from "src/app/1/models/models";

@Component({
  selector: "app-skill-picker",
  templateUrl: "./skill-picker.component.html",
  styleUrls: ["./skill-picker.component.scss"],
})
export class SkillPickerComponent implements OnInit {
  @Output() handleSelect = new EventEmitter<Skill>();
  @Input() arr: Skill[];
  placeholder: string = "Add Skills";

  mycontrol = new FormControl();
  filteredArr: Observable<Skill[]>;
  ngOnInit() {

    this.filteredArr = this.mycontrol.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(filterStr: string): Skill[] {
    const filterValue = this._normalizeValue(filterStr);
    return this.arr.filter((x) =>
      this._normalizeValue(x.title).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }


  onSelect(event) {
    if (event.keyCode === 13) { // Enter
      let value = event.target.value;
      let k = this.arr.findIndex(x => x.title === value);
      if (k === -1) return;

      event.target.value = "";
      this.handleSelect.emit(this.arr[k]._id);
    }
  }
}
