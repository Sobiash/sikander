import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Parcel} from '../../../models/Parcel';

@Component({
  selector: 'ngx-barcode-component',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent {
  @Input() parcel: Parcel;

  constructor(protected ref: NbDialogRef<BarcodeComponent>) { }


  async cancel() {
    this.ref.close();
  }
}
