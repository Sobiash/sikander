import {Component, Input, OnInit} from '@angular/core';
import {Parcel} from '../../../../models/Parcel';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {TranslateService} from '../../../../services/translate.service';

@Component({
  selector: 'ngx-kremo-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss'],
})
export class EditViewComponent implements OnInit {
  @Input() public parcel: Parcel;
  @Input() disabled: boolean;
  emailLoading: boolean;
  userList: User[] = [];
  cremationtype: boolean = false;
  payertype: boolean = false;
  loading: boolean = true;
  emailFocused: boolean = false;
  public user: User;
  constructor(private userService: UserService, private translate: TranslateService) { }

  ngOnInit() {
    this.userService.getUserById(this.parcel.recipient).subscribe(res => this.selectUser(res));
  this.getCremation().then(() => this.getPayerType().then(null));
  }
  async selectUser(user: User) {
    this.userList = [];
    this.user = user;
    this.loading = false;
  }
  async cremation() {
    this.parcel.subtype = this.cremationtype ? this.translate.translate('single')
      : this.translate.translate('joined');
  }
  private async getCremation() {
    this.cremationtype = 'single' === this.parcel.subtype;
  }
  private async getPayerType() {
    this.payertype = this.parcel.delivery === 'clinic';
  }

  async payer() {
    this.parcel.delivery = this.payertype ? this.translate.translate('clinic')
      : this.translate.translate('owner');
  }
  toInt(number: string) { return Number(number); }
  public async findByEmail() {
    if (this.user.emailAddress === undefined || this.user.emailAddress.length < 2) return;
    this.emailLoading = true;
    this.userService.searchByEmail(this.user.emailAddress).subscribe(res => {
      this.userList = res;
      this.emailLoading = false;
    });
  }
}
