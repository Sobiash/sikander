import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TransportService} from './transport.service';
import {Observable} from 'rxjs';
import {Role} from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RolesService {

  private readonly _role = environment.api + '/role';

  constructor(private transport: TransportService) {
  }

  createRole(role: Role): Observable<Role> {
    return this.transport.Create<Role>(role, this._role);
  }

  updateRole(role: Role): Observable<Role> {
    return this.transport.Update<Role>(role, this._role);
  }

  getAll(): Observable<Role[]> {
    return this.transport.Read<Role[]>(this._role);
  }
  get(id: string): Observable<Role> {
    return this.transport.Read(this._role + '/' + id);
  }
  delete(id: string): Observable<Role> {
    return this.transport.Delete(this._role + '/' + id);
  }
}
