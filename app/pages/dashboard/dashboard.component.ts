import { Component } from '@angular/core';
import {ParcelService} from '../../services/parcel.service';
import {Parcel} from '../../models/Parcel';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public parcels: Parcel[] = [];
  public limit: number = 10;
  public skip: number = 0;
  public loading: boolean = true;
  public from: Date = new Date();
  public to: Date = new Date();

  constructor(private parcel: ParcelService, private router: Router) {
    this.dateReset().then(() => this.getParcels());
  }

  private async dateReset() {
    this.from.setDate(1);
    this.from.setMonth(this.from.getMonth() - 1 );
  }

  dateRange(range) {
    if (range.start) this.from = range.start;
    if (range.end) this.to = range.end;
    if (range.start && range.end) this.getParcels();
  }

  private getParcels() {
    this.loading = true;
    this.parcel.getMy(this.from, this.to, this.limit, this.skip).subscribe(response => {
      this.parcels = response;
      this.loading = false;
    }, () => this.router.navigateByUrl('/auth/logout'));
  }

  async next() {
    this.skip += this.limit;
    this.getParcels();
  }

  async prev() {
    this.skip -= this.limit;
    this.getParcels();
  }

  limitChanged() {
    this.getParcels();
  }
}
