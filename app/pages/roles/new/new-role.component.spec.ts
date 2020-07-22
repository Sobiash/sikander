import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoleComponent } from '../new/new-role.component';
import {AppModule} from '../../../app.module';
import {NbDialogRef, NbSpinnerModule} from '@nebular/theme';

describe('NewRoleComponent', () => {
  let component: NewRoleComponent;
  let fixture: ComponentFixture<NewRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, NbSpinnerModule],
      providers: [{provide: NbDialogRef, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });
});
