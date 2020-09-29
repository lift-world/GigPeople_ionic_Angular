import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyActiveBidsComponent } from './my-active-bids.component';

describe('MyActiveBidsComponent', () => {
  let component: MyActiveBidsComponent;
  let fixture: ComponentFixture<MyActiveBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyActiveBidsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyActiveBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
