import {Resource} from './Resource';

export class Role {
  public id: string;
  public name: string;
  public description: string;
  public resources: Resource[];
}
