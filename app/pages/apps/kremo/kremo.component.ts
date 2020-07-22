import { Component, OnInit } from '@angular/core';
import {Parcel} from '../../../models/Parcel';
import {User} from '../../../models/User';
import {Weight} from '../../../models/Weight';
import {UserService} from '../../../services/user.service';
import {ParcelService} from '../../../services/parcel.service';
import {GeoService} from '../../../services/geo.service';
import {Status} from '../../../models/Status';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {TranslateService} from '../../../services/translate.service';

@Component({
  selector: 'ngx-kremo',
  templateUrl: './kremo.component.html',
  styleUrls: ['./kremo.component.scss'],
})
export class KremoComponent implements OnInit {
  public parcel: Parcel;
  public user: User = new User();
  public userList: User[] = [];
  loading: boolean = false;
  emailLoading: boolean = false;
  cremationType: boolean = false;
  payerType: boolean = false;

  constructor(private userService: UserService, private parcelService: ParcelService, private geo: GeoService,
              private toast: NbToastrService, private router: Router, private translate: TranslateService) {
    this.setUpParcel().then(null);
  }

  ngOnInit() {
    this.parcel.statuses[0].geo = this.geo.geoGetter();
  }

public async findByEmail() {
    if (this.user.emailAddress === undefined || this.user.emailAddress.length < 2) return;
    this.emailLoading = true;
    this.userService.searchByEmail(this.user.emailAddress).subscribe(res => {
      this.userList = res;
      this.emailLoading = false;
    });
}
async selectUser(user: User) {
    this.userList = [];
    this.user = user;
}
  async save() {
    this.loading = true;
    this.syncUp().then(null);
    if (!this.user.id) {
      this.userService.createUser(this.user).subscribe(resp => {
        this.user = resp;
        this.syncUp().then(() => this.saveParcel().then(() =>
            this.toast.success(
              'Rekvisisjon opprettet',
              'Suksess!')));
      });
    } else {
      this.syncUp().then(() => this.saveParcel().then(
        () => this.toast.success('Rekvisisjon opprettet', 'Suksess!')));
    }
  }

  private async syncUp() {
    this.parcel.statuses[0].geo = this.geo.geoGetter();
    this.parcel.statuses[0].dateTime = new Date().toJSON();
    this.parcel.recipient = this.user.id;
    this.user.username = this.user.emailAddress;
    this.user.password = this.user.firstName + this.user.lastName;
  }

  private async saveParcel() {
    this.parcelService.createParcel(this.parcel).subscribe(() => {
      this.user = new User();
      this.setUpParcel();
      this.loading = false;
    });
  }
  private async setUpParcel() {
    this.parcel = new Parcel;
    this.parcel.weight = new Weight;
    this.parcel.statuses = [new Status];
    this.parcel.statuses[0].geo = this.geo.geoGetter();
    this.parcel.weight.unit = 'kg';
    this.parcel.pouch = false;
    this.parcel.parcels = [];
  }
  toInt(number: string) { return Number(number); }

  async cremation() {
    this.parcel.subtype = this.cremationType ? this.translate.translate('single')
      : this.translate.translate('joined');
  }

  async payer() {
    this.parcel.delivery = this.payerType ? this.translate.translate('clinic')
      : this.translate.translate('owner');
  }
}
