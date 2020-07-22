import { Component, OnInit } from '@angular/core';
import {NbSearchService} from '@nebular/theme';
import {ParcelService} from '../../services/parcel.service';
import {Parcel} from '../../models/Parcel';
import {Router} from '@angular/router';
import {NotificationsService} from '../../services/notifications.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {ExcelService} from '../../services/excel.service';

@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  private readonly fileName: string = 'report';
  public value: string = '';
  public loading: boolean = true;
  public parcels: Parcel[] = [];
  public skip: number = 0;
  public limit: number = 10;
  public filters: boolean = false;
  public status: string = '';
  public sender: string = '';
  public from: Date = new Date();
  public to: Date = new Date();
  public statuses: string[] = [];
  public loadingString: string = $localize`Loading...`;
  public userList: User[];

  constructor(private searchService: NbSearchService, private router: Router, private notifications: NotificationsService,
              private parcel: ParcelService, private route: Router,
              private users: UserService, private excelService: ExcelService) { this.searchInit().then(_ => null); }

  ngOnInit() {
    this.dateReset().then(() => this.getLastParcels().then(
      () => this.notifications.statusList().subscribe((list) => {
        this.statuses = list;
        this.users.getAllUsers().subscribe(res => {
          this.userList = res;
          this.loading = false;
        });
      })));
  }
  public async exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.parcels, this.fileName);
  }

  private async dateReset() {
    this.from.setDate(1);
    this.from.setMonth(this.from.getMonth() - 1 );
  }

  async viewParcel(id: string) {
    this.route.navigateByUrl('pages/track/' + id).then(_ => null);
  }

  public async getLastParcels() {
    this.parcel.getParcels(this.limit, this.skip * this.limit).subscribe(resp => {
      this.parcels = resp;
      this.loading = false;
    });
  }

  public dateRange(range) {
    if (range.start) this.from = range.start;
    if (range.end) this.to = range.end;
    if (range.start && range.end) this.getParcels();
  }

  private getParcels() {
    this.loading = true;
    this.parcel.getFiltered(this.from, this.to, this.limit, this.skip).subscribe(response => {
      this.parcels = response;
      this.loading = false;
    }, () => this.router.navigateByUrl('/auth/logout'));
  }

  public async searchInit() {
    this.loading = true;
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.skip = 0;
        this.value = data.term;
        this.parcel.searchParcels(data.term, this.limit, this.limit * this.skip).subscribe(response => {
          this.parcels = response;
          this.loading = false;
        });
      });
  }
  async clearSearch() {
    this.loading = true;
    this.value = null;
    await this.getLastParcels();
  }

  async filter() {
    this.loading = true;
    this.parcel.getParcelsFiltered(this.limit, this.skip * this.limit, this.status, this.sender, this.value)
      .subscribe(resp => {
      this.parcels = resp;
      this.loading = false;
    });
  }

  async next() {
    this.skip += this.limit;
    await this.filter();
  }

  async prev() {
    this.skip -= this.limit;
    await this.filter();
  }

  async limitChanged() {
     await this.filter();
  }
}
