import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService, NbToastrService} from '@nebular/theme';
import {NewItemModalComponent} from '../../new-item-modal/new-item-modal.component';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {UserForm} from '../../../models/UserForm';
import {RolesService} from '../../../services/roles.service';

@Component({
  selector: 'ngx-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  loading: boolean = true;
  smallLocation: boolean = false;
  user: User = new User();
  public form: UserForm = new UserForm();
  public smallProfile: boolean = false;
  private readonly passwordLength: number = -9;
  loadingString: string = $localize`Loading...`;
  inactiveString: string = $localize`Inactive`;
  activeString: string = $localize`Active`;

  constructor(protected ref: NbDialogRef<NewUserComponent>,
              private toast: NbToastrService,
              private cdr: ChangeDetectorRef,
              private roles: RolesService,
              private userService: UserService,
              private dialogService: NbDialogService) {
  }

  ngOnInit() {
    this.getFrom().then(_ => this.generatePassword());
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



  public async generatePassword() {
    this.user.password = Math.random().toString(36).slice(this.passwordLength);
  }

  async cancel() {
    this.ref.close();
  }

  async toggleLocation() {
    this.smallLocation = !this.smallLocation;
    this.cdr.detectChanges();
  }

  async saveProfile() {
    this.userService.createUser(this.user).subscribe(response => {
      this.user = response;
      this.toast.success('User created', 'Success');
      this.ref.close();
    }, e => this.toast.danger(e.message, 'Error!'));
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
