import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';

@Component({
  selector: 'ngx-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss'],
})
export class DisplayUserComponent implements OnInit {
  @Input('id') readonly id: string;
  @Input('input') readonly input: boolean = false;
  @Input('disabled') readonly disabled: boolean = true;
  @Input('get') private readonly get: string = 'realname';
  User: User = new User();
  display: string = 'Loading...';
  private _lastUser: User = new User();

  constructor(private service: UserService) {
  }

  ngOnInit() {
    this._lastUser.id === this.id ? this.aggregate(this._lastUser) :
    this.service.getUserById(this.id)
      .subscribe(res => this.aggregate(res)
        , _ => this.display = 'Unknown');
  }

  private aggregate(user: User): void { // @TODO: caching needs fixing as it does not persist _lastUser
    this._lastUser = user;
    switch (this.get) {
      case 'location':
        this.getLocation(user);
        break;
      case 'department':
        this.getDepartment(user);
        break;
      case 'email':
        this.getEmail(user);
        break;
      case 'phone':
        this.getPhone(user);
        break;
      default:
        this.getRealName(user);
    }
  }

  private getLocation(user: User): void {
    this.display = user.site;
  }

  private getDepartment(user: User): void {
    this.display = user.department;
  }

  private getEmail(user: User): void {
    this.display = user.emailAddress;
  }

  private getPhone(user: User): void {
    this.display = user.phoneNumber;
  }

  private getRealName(user: User): void {
    this.display = `${user.firstName}  ${user.lastName}`;
  }

}
