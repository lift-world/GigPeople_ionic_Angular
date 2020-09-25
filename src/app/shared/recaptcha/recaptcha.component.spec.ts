import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecaptchaComponent } from './recaptcha.component';

describe('RecaptchaComponent', () => {
  let component: RecaptchaComponent;
  let fixture: ComponentFixture<RecaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecaptchaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
