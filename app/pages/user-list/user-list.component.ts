import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {LocalDataSource} from 'ng2-smart-table';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {NewUserComponent} from './new-user/new-user.component';
import {TableSettings} from './table-settings';
import {EditUserComponent} from './edit-user/edit-user.component';
import {TranslateService} from '../../services/translate.service';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  public loading: boolean = true;
  public settings;

  source: LocalDataSource = new LocalDataSource();
  loadingString: string;

  constructor(private service: UserService, private dialogService: NbDialogService,
              private toast: NbToastrService, private translate: TranslateService) {
    const ts = new TableSettings(translate);
    this.settings = ts.get;
    this.loadingString = translate.translate(`Loading...`);
  }

  ngOnInit() {
    this.loadUsers().then(null);
  }

  onDeleteConfirm(event): void {
    if (window.confirm(this.translate.translate('Are you sure you want to delete?'))) {
      event.confirm.resolve().then(null);
    } else {
      event.confirm.reject().then(null);
    }
  }

  async createUser() {
    this.dialogService.open(NewUserComponent).onClose.subscribe(() => this.loadUsers());
  }

  async editUser($event: any) {
    this.dialogService.open(EditUserComponent, {context: {data: $event.data}})
      .onClose.subscribe( () => this.loadUsers());
  }

  async deleteUser($event: any) {
    this.service.lockUser($event.data).subscribe(
      _ => this.loadUsers().then(() => this.toast.success(
        this.translate.translate('User Removed'), this.translate.translate('Success'))),
      err => this.toast.danger(this.translate.translate('Something went wrong'),
        this.translate.translate('Error')));
  }

  private async loadUsers() {
    this.service.getAllUsers().subscribe(res => {
      this.source.load(res);
      this.loading = false;
    });
  }
}


