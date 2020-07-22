import { Component, OnInit } from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Role} from '../../models/Role';
import {NewRoleComponent} from './new/new-role.component';
import {RolesService} from '../../services/roles.service';

@Component({
  selector: 'ngx-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {

  public roles: Role[] = [];
  public role: Role = new Role();
  public loading: boolean = true;
  public view: boolean = false;
  public edit: boolean = false;
  public loadingString: string = $localize`Loading...`;

  constructor( private dialogService: NbDialogService, private toast: NbToastrService, private rolesService: RolesService) { }

  ngOnInit() {
    this.reload().then(null);
  }

  async viewRole(role: Role) {
    this.edit = false;
    if (role.id === this.role.id) {
      this.view = !this.view;
      return;
    }
    this.role = role;
    this.view = true;
  }

  async reload() {
    this.rolesService.getAll().subscribe(resp => {
      this.roles = resp;
      this.loading = false;
    });
  }

  async delete(id: string) {
    this.loading = true;
    this.rolesService.delete(id).subscribe(r => {
      this.reload().then(() => {
        this.toast.success('Role Deleted', 'Success');
        this.loading = false;
      });
    });
  }

  async editRole(role: Role): Promise<void> {
    this.view = false;
    if (role.id === this.role.id) {
      this.edit = !this.edit;
      return;
    }
    this.role = role;
    this.edit = true;
    // this.dialogService.open(EditRoleComponent)
    //   .onClose.subscribe(() => {
    //   this.reload().then(() => this.toast.success('Role Saved', 'Success'));
    // }, error => {
    //   this.toast.danger(error.message, 'Error');
    // });
  }

  async newRole(): Promise<void> {
    this.dialogService.open(NewRoleComponent)
      .onClose.subscribe(() => {
        this.reload().then(() => this.toast.success('Role Saved', 'Success'));
    }, error => {
        this.toast.danger(error.message, 'Error');
    });
  }

  editEnabled($event: boolean) {
    this.edit = $event;
  }
}
