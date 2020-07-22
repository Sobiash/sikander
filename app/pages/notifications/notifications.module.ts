import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationsComponent} from './notifications.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule, NbListModule,
  NbPopoverModule, NbSelectModule,
  NbToggleModule,
} from '@nebular/theme';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';




@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbToggleModule, CKEditorModule, NbButtonModule, NbIconModule, FormsModule,
    NbInputModule, NbPopoverModule, NbSelectModule, NbListModule, NbAlertModule,
  ],
})
export class NotificationsModule { }
