import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransportService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  public Create<T>(object: object, url: string): Observable <T> {
    return this.http.post<T>(url,
      JSON.stringify(object), this.httpOptions,
    );
  }
  public Read<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  public Update<T>(object: object, url: string): Observable<T> {
    return this.http.patch<T>(url, JSON.stringify(object), this.httpOptions);
  }
  public Delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, this.httpOptions);
  }
}
