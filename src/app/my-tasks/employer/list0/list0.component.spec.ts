import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { List0Component } from './list0.component';

describe('List0Component', () => {
  let component: List0Component;
  let fixture: ComponentFixture<List0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List0Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(List0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
