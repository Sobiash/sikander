import {Injectable} from '@angular/core';
import {Geo} from '../models/Geo';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeoService {
  private readonly geoStore: string = 'geo';

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.collectGeoPosition(position);
      });
    } else console.error('no geo location support from this browser');
  }

  collectGeoPosition(position) {
    const geo = new Geo();
    geo.lat = position.coords.latitude;
    geo.lon = position.coords.longitude;
    geo.gln = '';
    this.geoSetter(geo);
  }

  protected geoSetter(geo: Geo) {
    localStorage.setItem(this.geoStore, JSON.stringify(geo));
  }

  public geoGetter(): Geo {
    return JSON.parse(localStorage.getItem(this.geoStore)) as Geo;
  }
}


