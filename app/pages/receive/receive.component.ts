import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Parcel} from '../../models/Parcel';
import {Inventory} from '../../models/Inventory';
import {ParcelService} from '../../services/parcel.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Geo} from '../../models/Geo';
import {TrackNoResponse} from '../../models/TrackNoResponse';
import {NotificationsService} from '../../services/notifications.service';
import {GeoService} from '../../services/geo.service';
import {NewUserComponent} from '../user-list/new-user/new-user.component';

@Component({
    selector: 'ngx-profile',
    templateUrl: './receive.component.html',
    styleUrls: ['./receive.component.scss'],
})

export class ReceiveComponent implements OnInit {
    public parcel: Parcel = {
        active: true,
        alternative: '',
        confirmation: '',
        courier: '',
        delivery: 'direct',
        description: '',
        external: '',
        id: '',
        name: '',
        po: '',
        priority: 'standard',
        recipient: '',
        sender: '',
        return: '',
        site: '',
        type: 'parcel',
        subtype: 'regular',
        pouch: false,
        created: '',
        expiry: {
            amount: 0,
            unit: 'days',
        },
        dimension: {
            unit: 'meters',
            x: 0,
            y: 0,
            z: 0,
        },
        weight: {
            amount: 0,
            unit: 'kg',
        },
        statuses: [{
            type: 'received',
            by: null,
            dateTime: null,
            location: null,
            note: null,
            route: null,
          photos: [],
          geo: new Geo(),
        }],
      parcels: [],
    };

    public inventory: Inventory = {
        dimension: {unit: 'meters', z: 0, y: 0, x: 0},
        weight: {unit: 'kg', amount: 0},
        multiple: {unit: 'items', amount: 0},
        Id: '',
        description: '',
        location:
            [{
                code: '', compartment: '', isle: '', dimensions: {unit: 'meters', z: 0, y: 0, x: 0},
                row: '', shelf: '', weight: {unit: 'kg', amount: 0},
            }],
        name: '',
        plu: '',
        price:
            {currency: 'sek', gross: 0, margin: 0, net: 0, tax: '0.23'},
        seasonable: false,
    };

  users: User[] = [];
  loading: boolean = false;
  generated: boolean = false;
  recipient: string = '';
  sender: string = '';
  searching: string;
  return: string = '';
  alternative: string = '';
    public parcelSize: boolean = false;
    public deliveryLarge: boolean = false;
    public inventorySize: boolean = false;
    public statuses: string[] = [];

    constructor(private parcelService: ParcelService, private toast: NbToastrService, private notification: NotificationsService,
                private cdr: ChangeDetectorRef, private user: UserService, private authService: NbAuthService,
                private geo: GeoService, private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        const user = token.getPayload();
        this.getSender(user.actort).then(null);
        this.notification.statusList().subscribe(list => this.statuses = list);
        this.parcel.statuses[0].geo = this.geo.geoGetter();
      }
    });
  }

    async createParcel() {
      this.parcel.statuses[0].geo = this.geo.geoGetter();
      this.parcel.statuses[0].dateTime = new Date().toJSON();
      this.checkForExternalId().then(() =>
        this.parcelService.createParcel(this.parcel).subscribe(r => this.toast.success('Parcel Created', 'Success!'),
          e => this.toast.danger(e, 'Error!')),
      );
    }
    private async checkForExternalId() {
      if (this.generated || this.parcel.id) this.parcel.external = this.parcel.id;
    }

    public async getTrackNo() {
        this.parcelService.getTrackNo().subscribe((track: TrackNoResponse) => {
            this.parcel.id = track.trackno;
            this.generated = true;
        });
    }

    public async smallParcel(): Promise<void> {
        this.parcelSize = !this.parcelSize;
        this.cdr.detectChanges();
    }

    public async smallDelivery(): Promise<void> {
        this.deliveryLarge = !this.deliveryLarge;
        this.cdr.detectChanges();
    }

    public async inventorySmall(): Promise<void> {
        this.inventorySize = !this.inventorySize;
        this.cdr.detectChanges();
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
  async createSender(searched: string) {
    this.dialogService.open(NewUserComponent).onClose.subscribe(() =>
      this.user.searchUser(searched).subscribe(response => this.users = response));
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

  async selectSender(u: User) {console.info(u);
    this.sender = this.userObjectToName(u);
    this.parcel.sender = u.id;
    this.users = [];
  }

  private async getSender(user: string) {
    await this.user.getUserById(user).subscribe(u => {
      this.sender = this.userObjectToName(u);
      this.parcel.sender = u.id;
    }, _ => this.sender = 'Unknown');
  }

  private userObjectToName(user: User): string {
    return user.firstName + ' ' + user.lastName;
  }

  public async createRecipient(searched: string) {
    this.dialogService.open(NewUserComponent).onClose.subscribe(() =>
      this.user.searchUser(searched).subscribe(response => this.users = response));
  }
}
