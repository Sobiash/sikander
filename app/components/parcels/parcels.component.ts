import {Component, Input} from '@angular/core';
import {Parcel} from '../../models/Parcel';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.scss'],
})
export class ParcelsComponent {
@Input('parcels') public parcels: Parcel[];

  loading: boolean = false;
  constructor(private route: Router) {
  }

  async viewParcel(id: string) {
    await this.route.navigateByUrl('pages/track/' + id);
  }
}
