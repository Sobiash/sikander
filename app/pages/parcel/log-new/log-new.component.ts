import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {ParcelService} from '../../../services/parcel.service';
import {Parcel} from '../../../models/Parcel';
import {StatusRequest} from '../../../models/StatusRequest';
import {NotificationsService} from '../../../services/notifications.service';
import {GeoService} from '../../../services/geo.service';

@Component({
  selector: 'ngx-log-new',
  templateUrl: './log-new.component.html',
  styleUrls: ['./log-new.component.scss'],
})
export class LogNewComponent {
  @Input() parcel: Parcel;
  public status: StatusRequest = new StatusRequest();
  public parcelStatuses: string[] = [];

  constructor(private geo: GeoService, protected ref: NbDialogRef<LogNewComponent>,
              private service: ParcelService, private notification: NotificationsService) {
    this.notification.statusList().subscribe(list => this.parcelStatuses = list);
    this.status.geo = this.geo.geoGetter();
  }

  async cancel() {
    this.ref.close();
  }

  async save() {
      this.service.addLog(this.status, this.parcel.id).subscribe(_ => this.ref.close());
  }
}
