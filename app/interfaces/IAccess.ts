import {Role} from '../models/Role';

export interface IAccess {
  id: string;
  token: string;
  language: string;
  role: Role;
}
