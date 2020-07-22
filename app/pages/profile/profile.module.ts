import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile.component';
import {
  NbCardModule,
  NbSelectModule,
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbIconModule, NbSpinnerModule,
} from '@nebular/theme';
import { NbRadioModule} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from '../pages-routing.module';
import {NewItemModalComponent} from '../new-item-modal/new-item-modal.component';

@NgModule({
  declarations: [ProfileComponent, NewItemModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    PagesRoutingModule,
    ThemeModule,
    NbCardModule,
    NbSelectModule,
    NbRadioModule,
    NbIconModule,
    NbSpinnerModule,
  ],
  entryComponents: [NewItemModalComponent],
})
export class ProfileModule {}
