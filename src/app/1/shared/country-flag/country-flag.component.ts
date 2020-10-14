import { Component, Input, OnInit } from '@angular/core';
import * as countryList from "country-list";
import { Country } from "src/app/1/models/Country";

@Component({
  selector: 'app-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss'],
})
export class CountryFlagComponent implements OnInit {
  @Input() code: string;
  @Input() onlyFlag: boolean;
  
  constructor() { }

  ngOnInit() {}

  getName(code) {
    return countryList.getName(this.code);
  }

  getFlagUrl(code) {
    return "assets/images/flags/" + this.code.toLowerCase() + ".svg";
  }
}
