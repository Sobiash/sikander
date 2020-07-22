import {Dimensions} from './Dimensions';
import {Weight} from './Weight';

export class Location {
  public isle: string;
  public row: string;
  public shelf: string;
  public compartment: string;
  public code: string;
  public dimensions: Dimensions;
  public weight: Weight;
}
