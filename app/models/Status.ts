import {StatusRequest} from './StatusRequest';

export class Status extends StatusRequest {
  dateTime: string;
  location: string;
  by: string;
  route: string;
  photos: string[];
}
