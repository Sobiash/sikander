import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Observable} from 'rxjs';

export class UserServiceMock {
  public getAllUsers(): Observable<User[]> {
    return new Observable(observer => {
      setInterval(() => observer.next([new User, new User, new User]), 1000);
    });
  }
}


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [NbDialogService, NbToastrService, {provide: UserService, useValue: UserServiceMock}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
