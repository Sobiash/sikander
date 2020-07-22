import { TestBed } from '@angular/core/testing';
import { ParcelService } from './parcel.service';
import {HttpClient} from '@angular/common/http';

describe('ParcelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: HttpClient, useValue: {}}],
  }));

  it('should be created', () => {
    const service: ParcelService = TestBed.get(ParcelService);
    expect(service).toBeTruthy();
  });
});
