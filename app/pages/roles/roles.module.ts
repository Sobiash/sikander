import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { RolesComponent } from './roles.component';
import {
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbToggleModule,
  NbButtonModule,
  NbIconModule,
  NbCheckboxModule, NbListModule, NbUserModule, NbSpinnerModule,
} from '@nebular/theme';
import { NewRoleComponent } from './new/new-role.component';
import {FormsModule} from '@angular/forms';
import {EditRoleComponent} from './edit/edit-role.component';



@NgModule({
  declarations: [ RolesComponent, NewRoleComponent, EditRoleComponent],
  imports: [
    ThemeModule, NbCardModule,
    NbInputModule, NbSelectModule,
    NbToggleModule, NbButtonModule,
    NbIconModule, NbCheckboxModule, FormsModule, NbListModule, NbUserModule, NbSpinnerModule,
  ],
  entryComponents: [NewRoleComponent, EditRoleComponent],
})
export class RolesModule { }
