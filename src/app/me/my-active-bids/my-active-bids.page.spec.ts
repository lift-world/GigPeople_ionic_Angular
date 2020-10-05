import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyActiveBidsPage } from './my-active-bids.page';

describe('MyActiveBidsPage', () => {
  let component: MyActiveBidsPage;
  let fixture: ComponentFixture<MyActiveBidsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyActiveBidsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyActiveBidsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
