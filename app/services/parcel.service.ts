import { Injectable } from '@angular/core';
import { TransportService } from './transport.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Parcel } from '../models/Parcel';
import {StatusRequest} from '../models/StatusRequest';
import {TrackNoResponse} from '../models/TrackNoResponse';

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  private readonly parcelUrl: string = environment.api + '/parcel';
  private readonly status: string = environment.api + '/parcel/status/';
  private readonly external: string = environment.api + '/parcel/external/';
  private readonly exists: string = environment.api + '/parcel/exist/';
  private readonly my: string = environment.api + '/parcel/me';
  private readonly trackno: string = environment.api + '/parcel/gettrackno';

  constructor(private transport: TransportService) { }

  public createParcel(parcel: Parcel): Observable<Parcel> {
    return this.transport.Create<Parcel>(parcel, this.parcelUrl);
  }
  public updateParcel(parcel: Parcel): Observable<Parcel> {
    return this.transport.Update<Parcel>(parcel, this.parcelUrl);
  }
  public getTrackNo(): Observable<TrackNoResponse> {
    return this.transport.Read<TrackNoResponse>(this.trackno);
  }
  public getOneById(id: string): Observable<Parcel> {
    return this.transport.Read(this.parcelUrl + '/' + id);
  }
  public addLog(status: StatusRequest, id: string): Observable<Parcel> {
    return this.transport.Create<Parcel>(status, this.status + id);
  }
  public addExternalLog(status: StatusRequest, id: string): Observable<Parcel> {
    return this.transport.Create<Parcel>(status, this.external + id);
  }
  public getParcels(limit: number, page: number): Observable<Parcel[]> {
    return this.transport.Read<Parcel[]>(this.parcelUrl + `?limit=${limit}&skip=${page}`);
  }
  public getParcelsFiltered(limit: number, page: number, status: string, sender: string, search: string): Observable<Parcel[]> {
    let filters = (status) ? `&status=${status}` : '';
    filters += (sender) ? `&sender=${sender}` : '';
    filters += (search) ? `&search=${search}` : '';
    return this.transport.Read<Parcel[]>(this.parcelUrl + `?limit=${limit}&skip=${page}` + filters);
  }
  public searchParcels(search: string, limit: number, page: number): Observable<Parcel[]> {
    return this.transport.Read<Parcel[]>(this.parcelUrl + `?search=${search}&limit=${limit}&skip=${page}`);
  }
  public getFiltered(from: Date, to: Date, limit: number, page: number): Observable<Parcel[]> {
    return this.transport.Read<Parcel[]>(this.parcelUrl + `?from=${from.toJSON()}&to=${to.toJSON()}&limit=${limit}&skip=${page}`);
  }
  public getMy(from: Date, to: Date, limit: number, page: number): Observable<Parcel[]> {
    return this.transport.Read<Parcel[]>(this.my + `?from=${from.toJSON()}&to=${to.toJSON()}&limit=${limit}&skip=${page}`);
  }
  public checkIfExists(id: string): Observable<any> {
    return this.transport.Read(this.exists + id);
  }
}
