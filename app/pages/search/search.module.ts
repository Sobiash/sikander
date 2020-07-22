import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchComponent} from './search.component';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule, NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../@theme/theme.module';



@NgModule({
  declarations: [SearchComponent],
    imports: [
        CommonModule,
        NbCardModule,
        NbSpinnerModule,
        NbIconModule,
        NbButtonModule,
        NbSelectModule,
        NbActionsModule,
        NbDatepickerModule,
        NbInputModule,
        FormsModule,
        ThemeModule,
    ],
})
export class SearchModule { }
