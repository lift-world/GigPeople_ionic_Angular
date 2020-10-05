import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageTasksPage } from './manage-tasks.page';

describe('ManageTasksPage', () => {
  let component: ManageTasksPage;
  let fixture: ComponentFixture<ManageTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
