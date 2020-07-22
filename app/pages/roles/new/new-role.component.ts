import { Component } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Role} from '../../../models/Role';
import {Resource} from '../../../models/Resource';
import {RolesService} from '../../../services/roles.service';

@Component({
  selector: 'ngx-new',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent {

  public role: Role = {
    id: null,
    name: null,
    description: null,
    resources: [{
      name: 'parcel',
      delete: true,
      update: true,
      read: true,
      create: true,
    }],
  };
  constructor(protected ref: NbDialogRef<NewRoleComponent>, private rolesService: RolesService) {}

  async newRole() {
    this.role.resources.push(new Resource());
  }
  async removeRole() {
    this.role.resources.pop();
  }
  cancel() {
    this.ref.close();
  }

  save() {
    this.rolesService.createRole(this.role).subscribe(() => this.ref.close());
  }
}
