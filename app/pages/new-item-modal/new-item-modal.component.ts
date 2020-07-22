import {Component, Input} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-new-item-modal',
  templateUrl: './new-item-modal.component.html',
  styleUrls: ['./new-item-modal.component.scss'],
})
export class NewItemModalComponent  {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<NewItemModalComponent>) { }

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }

}
