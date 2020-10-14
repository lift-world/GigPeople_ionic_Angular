import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BidsComponent } from './bids.component';

describe('BidsComponent', () => {
  let component: BidsComponent;
  let fixture: ComponentFixture<BidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
