import {Component, Input, OnInit} from '@angular/core';
import {Parcel} from '../../../models/Parcel';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {NotificationsService} from '../../../services/notifications.service';

@Component({
  selector: 'ngx-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss'],
})
export class EditViewComponent implements OnInit {
@Input() public parcel: Parcel;
@Input() disabled: boolean;

  public types: string[] = [];
  readonly pendingLabel: string = 'Loading...';
  users: User[] = [];
  loading: boolean = false;
  recipient: string = this.pendingLabel;
  sender: string = this.pendingLabel;
  searching: string;
  return: string = this.pendingLabel;
  alternative: string = this.pendingLabel;
  constructor(private user: UserService, private notification: NotificationsService) { }

  ngOnInit(): void {
    this.getUserNames().then(() => {
      this.notification.statusList().subscribe(list => this.types = list);
    });
  }

  async searchUser(event: any) {
    if (event.target.value.length < 3) return;
    this.searching = event.target.id;
    this.loading = true;
    this.user.searchUser(event.target.value).subscribe(response => {
      this.users = response;
      this.loading = false;
    } );
  }

  async selectRecipient(u: User) {
    this.recipient = this.userObjectToName(u);
    this.parcel.recipient = u.id;
    this.users = [];
  }
  async selectReturn(u: User) {
    this.return = this.userObjectToName(u);
    this.parcel.return = u.id;
    this.users = [];
  }
  async selectAlternative(u: User) {
    this.alternative = this.userObjectToName(u);
    this.parcel.alternative = u.id;
    this.users = [];
  }

  async selectSender(u: User) {
    this.sender = this.userObjectToName(u);
    this.parcel.sender = u.id;
    this.users = [];
  }

  async getUserNames() {
    this.getRecipient().then(
      () => this.getSender().then(
        () => this.getReturn().then(
          () => this.getRecipient().then(
            () => this.getAlternative().then(null),
          ),
        ),
      ),
    );
  }

  private async getRecipient() {
    await this.user.getUserById(this.parcel.recipient).subscribe(u => {
      this.recipient = this.userObjectToName(u);
    }, _ => this.recipient = 'Unknown');
  }

  private async getSender() {
    await this.user.getUserById(this.parcel.sender).subscribe(u => {
      this.sender = this.userObjectToName(u);
    }, _ => this.sender = 'Unknown');
  }

  private async getAlternative() {
    if (!this.parcel.alternative) {
      this.alternative = null;
      return;
    }
    await this.user.getUserById(this.parcel.alternative).subscribe(u => {
      this.alternative = this.userObjectToName(u);
    }, _ => this.alternative = 'Unknown');
  }

  private async getReturn() {
    if (!this.parcel.return) {
      this.return = null;
      return;
    }
    await this.user.getUserById(this.parcel.return).subscribe(u => {
      this.return = this.userObjectToName(u);
    }, _ => this.return = 'Unknown');
  }

  private userObjectToName(user: User): string {
    return user.firstName + ' ' + user.lastName;
  }
}
