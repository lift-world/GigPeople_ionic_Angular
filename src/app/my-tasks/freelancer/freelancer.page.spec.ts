import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FreelancerPage } from './freelancer.page';

describe('FreelancerPage', () => {
  let component: FreelancerPage;
  let fixture: ComponentFixture<FreelancerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FreelancerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
