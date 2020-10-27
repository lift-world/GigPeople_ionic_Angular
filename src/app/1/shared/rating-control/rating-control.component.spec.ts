import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingControlComponent } from './rating-control.component';

describe('RatingControlComponent', () => {
  let component: RatingControlComponent;
  let fixture: ComponentFixture<RatingControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingControlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
