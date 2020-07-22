import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ParcelService} from '../../services/parcel.service';
import {Parcel} from '../../models/Parcel';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {LogNewComponent} from './log-new/log-new.component';
import tt from '@tomtom-international/web-sdk-maps';
import {environment} from '../../../environments/environment';
import {File} from '../../models/File';
import {FileService} from '../../services/file.service';
import {Status} from '../../models/Status';

import {Location} from '@angular/common';
import {TranslateService} from '../../services/translate.service';
import {EditViewComponent} from '../apps/kremo/edit-view/edit-view.component';
import {BarcodeComponent} from '../apps/kremo/barcode/barcode.component';

@Component({
  selector: 'ngx-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ParcelComponent implements OnInit, OnDestroy {
  @ViewChild(EditViewComponent, {static: false}) edit: EditViewComponent;
  id: string;
  parcel: Parcel = new Parcel();
  loading: boolean = true;
  disabled: boolean = true;
  public photos: File[] = [];
  public signature: File = new File();
  private sub: any;
  parcelLabel: any;

  constructor(protected toast: NbToastrService, private fileService: FileService, private route: ActivatedRoute,
              private dialogService: NbDialogService, private service: ParcelService, private _location: Location,
              private translate: TranslateService) {
    this.parcelLabel = translate.translate('Parcel');
  }

  async ngOnInit() {
    this.reload().then(null);
  }

  async openLog() {
    this.dialogService.open(LogNewComponent, {context: {parcel: this.parcel}})
      .onClose.subscribe(_ => this.reload());
  }
  async printBarcode() {
    this.dialogService.open(BarcodeComponent, {context: {parcel: this.parcel}})
      .onClose.subscribe(_ => this.reload());
  }

  async ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private static initMaps(parcel: Parcel) {
    if (parcel.statuses[0].geo === null) return;
    const pin = [parcel.statuses[0].geo.lon, parcel.statuses[0].geo.lat];
    const map = tt.map({
      key: environment.mapKey,
      container: 'map',
      style: 'tomtom://vector/1/hybrid-main',
      zoom: 10,
      center: [parcel.statuses[0].geo.lon, parcel.statuses[0].geo.lat],
    });
    map.addControl(new tt.NavigationControl());
    return new tt.Marker().setLngLat(pin).addTo(map);
  }

  private async reload() {
    this.sub = this.route.params.subscribe(params => {
      this.service.getOneById(params['id']).subscribe(_parcel => {
        this.parcel = _parcel;
        if (_parcel.confirmation) this.fileService.getFile(_parcel.confirmation).subscribe(res => this.signature = res);
        this.loadPhotos(_parcel.statuses).then(null);
        this.loading = false;
        ParcelComponent.initMaps(_parcel);
      });
    });
  }

  private async loadPhotos(status: Status[]) {
    for (const s of status) {
      if (s.photos == null) continue;
      for (const p of s.photos) {
        if (p) this.fileService.getFile(p).subscribe(pic => this.photos.unshift(pic));
      }
    }
  }

  async back() {
    this._location.back();
  }

  async save() {
    this.disabled = !this.disabled;
    this.service.updateParcel(this.edit.parcel).subscribe(
      _ => this.toast.success(this.translate.translate('Saved'), this.translate.translate('Success')),
      err => this.toast.danger(this.translate.translate('Not Saved'), this.translate.translate('Error')));
  }
}
