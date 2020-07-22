import { TestBed } from '@angular/core/testing';

import { TransportService } from './transport.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TransportService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  }));

  it('should be created', () => {
    const service: TransportService = TestBed.get(TransportService);
    expect(service).toBeTruthy();
  });
});
