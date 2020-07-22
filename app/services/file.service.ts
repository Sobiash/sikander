import { Injectable } from '@angular/core';
import {TransportService} from './transport.service';
import {File} from '../models/File';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
private readonly signature: string = environment.api + '/upload';
  constructor(private transport: TransportService) { }
  public getFile(id: string) {
    return this.transport.Read<File>(this.signature + `/${id}`);
  }
}
