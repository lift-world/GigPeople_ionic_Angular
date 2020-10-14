import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-valid-marker',
  templateUrl: './valid-marker.component.html',
  styleUrls: ['./valid-marker.component.scss'],
})
export class ValidMarkerComponent implements OnInit {
  @Input() x;
  constructor() { }

  ngOnInit() {}

}
