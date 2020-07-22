import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParcelComponent} from './parcel.component';
import {
  NbAlertModule, NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule, NbListModule, NbSelectModule,
  NbSpinnerModule,
  NbStepperModule, NbTabsetModule, NbToggleModule, NbUserModule,
} from '@nebular/theme';
import { LogNewComponent } from './log-new/log-new.component';
import {FormsModule} from '@angular/forms';
import { EditViewComponent } from './edit-view/edit-view.component';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import { DisplayUserComponent } from './display-user/display-user.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import { BarcodeComponent } from './barcode/barcode.component';
import {NgxPrintModule} from 'ngx-print';
import {KremoModule} from '../apps/kremo/kremo.module';


@NgModule({
  declarations: [ParcelComponent, LogNewComponent, EditViewComponent, DisplayUserComponent, BarcodeComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbStepperModule,
        NbSpinnerModule,
        NbButtonModule,
        NbIconModule,
        NbInputModule,
        NbSelectModule,
        FormsModule,
        OwlDateTimeModule,
        NbToggleModule,
        NbListModule,
        NbUserModule,
        NbAlertModule, NgxBarcodeModule, NbTabsetModule, NbBadgeModule, NgxPrintModule, KremoModule,
    ], entryComponents: [LogNewComponent, BarcodeComponent],
})
export class ParcelModule { }
