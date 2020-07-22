import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParcelsComponent} from './parcels.component';
import {ThemeModule} from '../../@theme/theme.module';



@NgModule({
  declarations: [ParcelsComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  exports: [
    ParcelsComponent,
  ],
})
export class ParcelsModule { }
