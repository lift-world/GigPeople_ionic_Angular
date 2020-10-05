import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployerProfileComponent } from './employer-profile.component';

describe('EmployerProfileComponent', () => {
  let component: EmployerProfileComponent;
  let fixture: ComponentFixture<EmployerProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerProfileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
