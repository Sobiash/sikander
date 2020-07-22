import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {KremoComponent} from './kremo.component';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule, NbLayoutModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule, NbToggleModule,
  NbUserModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';
import { EditViewComponent } from './edit-view/edit-view.component';
import { BarcodeComponent } from './barcode/barcode.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxPrintModule} from 'ngx-print';
import { KremoRoutingModule } from './kremo-routing.module';



@NgModule({
  declarations: [KremoComponent, ConfirmComponent, EditViewComponent, BarcodeComponent],
  imports: [
    KremoRoutingModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    NbSelectModule,
    NbIconModule, NbButtonModule,
    NbSpinnerModule, NbUserModule, NbListModule, NbToggleModule, NbLayoutModule, NgxBarcodeModule,
    NgxPrintModule, NbAlertModule,
  ], entryComponents: [BarcodeComponent],
    exports: [
        KremoComponent,
        EditViewComponent,
    ],
})
export class KremoModule { }
