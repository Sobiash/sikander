import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import {ParcelsModule} from '../../components/parcels/parcels.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    ParcelsModule,
    NbSpinnerModule,
    NbDatepickerModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
