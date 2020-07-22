import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule, NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule, NbListModule,
  NbSelectModule,
  NbToggleModule, NbUserModule,
} from '@nebular/theme';
import {ReceiveComponent} from './receive.component';
import {FormsModule} from '@angular/forms';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {KremoModule} from '../apps/kremo/kremo.module';




@NgModule({
  declarations: [ ReceiveComponent ],
    imports: [
        CommonModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule, NbIconModule, NbToggleModule,
        FormsModule, OwlDateTimeModule, OwlNativeDateTimeModule, NbActionsModule, NbAlertModule, NbListModule, NbUserModule, KremoModule,
    ],
})
export class ReceiveModule {}

