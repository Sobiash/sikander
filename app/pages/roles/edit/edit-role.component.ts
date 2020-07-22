import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Role} from '../../../models/Role';
import {Resource} from '../../../models/Resource';
import {RolesService} from '../../../services/roles.service';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditRoleComponent {
  @Input() role: Role;
  @Output() status = new EventEmitter<boolean>();
  public enabled: boolean = false;

  constructor(private rolesService: RolesService, private toast: NbToastrService) {}

  async newRole() {
    this.role.resources.push(new Resource());
  }
  async removeRole() {
    this.role.resources.pop();
  }
  async cancel() {
    this.enabled = false;
    this.status.emit(this.enabled);
  }

  async save() {
    this.rolesService.updateRole(this.role).subscribe(r => {
      this.toast.success('Role Updated', 'Success!');
    }, error => this.toast.danger(error.message, 'Error!'));
  }
}
