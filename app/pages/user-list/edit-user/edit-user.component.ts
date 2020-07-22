import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {User} from '../../../models/User';
import {UserForm} from '../../../models/UserForm';
import {UserService} from '../../../services/user.service';
import {NewItemModalComponent} from '../../new-item-modal/new-item-modal.component';
import {RolesService} from '../../../services/roles.service';


@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() data: User;
  smallProfile: boolean = false;
  loading: boolean = true;
  smallLocation: boolean = false;
  private passwordLength = -9;
  private form: UserForm = new UserForm();
  loadingString: string = $localize`Loading...`;
  activeString: string = $localize`Active`;
  inactiveString: string = $localize`Inactive`;
  constructor(protected ref: NbDialogRef<EditUserComponent>,
              private cdr: ChangeDetectorRef,
              private userService: UserService,
              private toast: NbToastrService,
              private roles: RolesService,
              private dialogService: NbDialogService) { }

  ngOnInit() {
    this.getFrom().then(null);
  }

  private async getFrom() {
    this.userService.getForm().subscribe(response => {
      this.form = response;
      this.roles.getAll().subscribe( sg => {
        this.form.securityGroup = sg;
        this.loading = false;
      });

    });
  }
  async generatePassword() {
    this.data.password = Math.random().toString(36).slice(this.passwordLength);
  }
  async cancel() {
    this.ref.close();
  }
  async saveProfile() {
    this.userService.updateUser(this.data).subscribe(response => {
      this.toast.success('User updated!', 'Success');
      this.ref.close();
    }, e => this.toast.danger(e.message, 'Error!'));
  }
  async toggleLocation() {
    this.smallLocation = !this.smallLocation;
    this.cdr.detectChanges();
  }

  async toggleProfile(): Promise<void> {
    this.smallProfile = !this.smallProfile;
    this.cdr.detectChanges();
  }

  async newSite(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Site Name'}})
      .onClose.subscribe(name => name && this.form.site.push(name));
  }

  async newSubSite(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Sub-Site Name'}})
      .onClose.subscribe(name => name && this.form.subSite.push(name));
  }

  async newBuilding(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Building Name'}})
      .onClose.subscribe(name => name && this.form.building.push(name));
  }

  async newFloor(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Floor Number'}})
      .onClose.subscribe(name => name && this.form.floor.push(name));
  }

  async newDepartment(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Department Name'}})
      .onClose.subscribe(name => name && this.form.department.push(name));
  }

  async newCostCenter(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Cost Center'}})
      .onClose.subscribe(name => name && this.form.costCenter.push(name));
  }

  async newMailDrop(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Mail Drop Name'}})
      .onClose.subscribe(name => name && this.form.mailDrop.push(name));
  }

  async newMailStop(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Mail Stop Name'}})
      .onClose.subscribe(name => name && this.form.mailStop.push(name));
  }

  async newRole(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Access Role Name'}})
      .onClose.subscribe(name => name && this.form.securityGroup.push(name));
  }

  async newRoute(): Promise<void> {
    this.dialogService.open(NewItemModalComponent, {context: {title: 'Provide New Route Name'}})
      .onClose.subscribe(name => name && this.form.route.push(name));
  }
}
