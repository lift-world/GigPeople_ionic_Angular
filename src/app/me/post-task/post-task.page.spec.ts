import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostTaskPage } from './post-task.page';

describe('PostTaskPage', () => {
  let component: PostTaskPage;
  let fixture: ComponentFixture<PostTaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
