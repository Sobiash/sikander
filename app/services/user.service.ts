import {Injectable} from '@angular/core';
import {TransportService} from './transport.service';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {environment} from '../../environments/environment';
import {UserForm} from '../models/UserForm';
import {Role} from '../models/Role';
import {IAccess} from '../interfaces/IAccess';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _usersUri: string = environment.api + '/users';
  private readonly _meUri: string = environment.api + '/users/me';
  private readonly _myAccessUri: string = environment.api + '/users/access';
  private readonly _email: string = environment.api + '/users/email';
  private readonly _phone: string = environment.api + '/users/phone';
  private readonly _userFormUri: string = environment.api + '/users/form';

  constructor(private transport: TransportService) {}

  public getAllUsers(): Observable<User[]> {
    return this.transport.Read<User[]>(this._usersUri);
  }

  public getUserById(uid: string): Observable<User> {
    return this.transport.Read<User>(this._usersUri + '/' + uid);
  }

  public getMe(): Observable<User> {
    return this.transport.Read<User>(this._meUri);
  }

  public getForm(): Observable<UserForm> {
    return this.transport.Read<UserForm>(this._userFormUri);
  }

  public updateMe(user: User) {
    return this.transport.Update<User>(user, this._meUri);
  }

  public createUser(user: User) {
    return this.transport.Create<User>(user, this._usersUri);
  }

  public updateUser(user: User) {
    return this.transport.Update(user, this._usersUri);
  }

  public lockUser(user: User) {
    user.active = false;
    return this.transport.Update(user, this._usersUri);
  }

  public searchUser(phrase: string): Observable<User[]> {
    return this.transport.Read<User[]>(this._usersUri + '?search=' + phrase);
  }

  public searchByEmail(email: string): Observable<User[]> {
    return this.transport.Read<User[]>(this._email + '?search=' + email);
  }
  public getUserAccess(): Observable<IAccess> {
    return this.transport.Read<IAccess>(this._myAccessUri);
  }

  public searchByphone(phone: string): Observable<User[]> {
    return this.transport.Read<User[]>(this._phone + '?search=' + phone);
  }
}
