import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageBiddersPage } from './manage-bidders.page';

describe('ManageBiddersPage', () => {
  let component: ManageBiddersPage;
  let fixture: ComponentFixture<ManageBiddersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBiddersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageBiddersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
