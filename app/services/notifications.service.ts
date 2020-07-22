import { Injectable } from '@angular/core';
import {TransportService} from './transport.service';
import {Notifications} from '../models/Notifications';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
private readonly _notificationUrl: string = environment.api + '/notification';
  constructor(private transport: TransportService) { }

  create(notifications: Notifications): Observable<Notifications> {
    return this.transport.Create<Notifications>(notifications, this._notificationUrl);
  }
  getAll(): Observable<Notifications[]> {
    return this.transport.Read<Notifications[]>(this._notificationUrl);
  }
  update(notifications: Notifications): Observable<Notifications> {
    return this.transport.Update(notifications, this._notificationUrl);
  }
  delete(notifications: Notifications): Observable<Notifications> {
    return this.transport.Delete<Notifications>(this._notificationUrl + `/${notifications.id}`);
  }
  statusList(): Observable<string[]> {
    return this.transport.Read<string[]>(this._notificationUrl + `/statuses`);
  }
  externalStatusList(): Observable<Notifications[]> {
    return this.transport.Read<Notifications[]>(this._notificationUrl + `/statuses/external`);
  }
}
