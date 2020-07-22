import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import {
  NbCardModule, NbDialogRef,
  NbDialogService,
  NbIconModule, NbLayoutDirectionService, NbOverlay, NbOverlayModule, NbOverlayService, NbPositionBuilderService,
  NbSelectModule,
  NbSpinnerModule, NbToastrModule,
  NbToastrService, NbToggleModule,
} from '@nebular/theme';
import {Observable} from 'rxjs';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {ChangeDetectorRef} from '@angular/core';
import {UserForm} from '../../../models/UserForm';
import {FormsModule} from '@angular/forms';

export class UserServiceMock {
  public getAllUsers(): Observable<User[]> {
    return new Observable(observer => {
      setInterval(() => observer.next([new User, new User, new User]), 1000);
    });
  }
  public getForm(): Observable<UserForm> {
    return new Observable(observer => {
      setInterval(() => observer.next(new UserForm()), 1000);
    });
  }
}

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserComponent],
      imports: [NbCardModule, NbSpinnerModule, NbIconModule, NbSelectModule, FormsModule,
        NbToggleModule, NbToastrModule.forRoot(), NbOverlayModule],
      providers: [ChangeDetectorRef, NbDialogService, NbToastrService, NbOverlayService, NbOverlay, NbLayoutDirectionService,
        NbPositionBuilderService,
        {provide: UserService, useValue: UserServiceMock}, {provide: NbDialogRef, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
