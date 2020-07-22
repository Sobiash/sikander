import {Location} from './Location';
import {Weight} from './Weight';
import {Dimensions} from './Dimensions';

export class Inventory {
  Id: string;
  plu: string;
  name: string;
  description: string;
  seasonable: boolean;
  location: Location[];
  price: Price;
  dimension: Dimensions;
  weight: Weight;
  multiple: Weight;
}

export class Price {
  public gross: number;
  public net: number;
  public margin: number;
  public tax: string;
  public currency: string;
}
