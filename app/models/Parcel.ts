import {Dimensions} from './Dimensions';
import {Weight} from './Weight';
import {Status} from './Status';

export class Parcel {
  id: string;
  name: string;
  description: string;
  type: string;
  subtype: string;
  po: string;
  sender: string;
  site: string;
  recipient: string;
  alternative: string;
  return: string;
  priority: string;
  dimension: Dimensions;
  weight: Weight;
  statuses: Status[];
  external: string;
  courier: string;
  delivery: string;
  pouch: boolean;
  created: string;
  active: boolean;
  expiry: Weight;
  confirmation: string;
  parcels: string[];
}

