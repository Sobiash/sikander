import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ParcelService} from '../../../../services/parcel.service';
import {Status} from '../../../../models/Status';
import {GeoService} from '../../../../services/geo.service';
import {NotificationsService} from '../../../../services/notifications.service';
import {Notifications} from '../../../../models/Notifications';

@Component({
  selector: 'ngx-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
public loading: boolean = true;
public confirmed: boolean = false;
public success: boolean;
public id: string = '';
public status: Status = new Status();
public ExternalStatuses: Notifications[] = [];

  constructor(private route: ActivatedRoute, private service: ParcelService, private geo: GeoService,
              private notification: NotificationsService) { }

  ngOnInit() {
    this.status.geo = this.geo.geoGetter();
    this.route.params.subscribe(params => this.check(params['parcelId']));
  }

  public async confirm(status: string) {
    this.status.type = status;
    this.send().then(null);
  }

  private async send() {
    this.loading = true;
    this.confirmed = true;
    this.service.addExternalLog(this.status, this.id).subscribe(() => this.isSuccess(true),
      () => this.isSuccess(false));
  }
  private check(id: string) {
    this.id = id;
    this.service.checkIfExists(id)
      .subscribe(() => this.isSuccess(true), () => this.isSuccess(false));
  }

  private isSuccess(status: boolean) {
    this.success = status;
    if (status) this.notification.externalStatusList().subscribe(response => this.ExternalStatuses = response);
    this.loading = false;
  }
}
