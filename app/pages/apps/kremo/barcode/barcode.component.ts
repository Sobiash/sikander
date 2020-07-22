import {Component, Input, OnInit} from '@angular/core';
import {Parcel} from '../../../../models/Parcel';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/User';

@Component({
  selector: 'ngx-kremo-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit {

  @Input() parcel: Parcel;
public recipient: User;
  constructor(protected ref: NbDialogRef<BarcodeComponent>, private userService: UserService) { }


  async cancel() {
    this.ref.close();
  }

  ngOnInit(): void {
    this.userService.getUserById(this.parcel.recipient).subscribe(res => this.recipient = res );
  }
}
