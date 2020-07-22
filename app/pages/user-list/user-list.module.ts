import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserListComponent} from './user-list.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NewUserComponent } from './new-user/new-user.component';
import {FormsModule} from '@angular/forms';
import { EditUserComponent } from './edit-user/edit-user.component';



@NgModule({
  declarations: [ UserListComponent, NewUserComponent, EditUserComponent ],
  imports: [
    CommonModule, NbCardModule, NbInputModule,
    Ng2SmartTableModule, NbButtonModule, NbIconModule, NbSpinnerModule, FormsModule, NbSelectModule, NbToggleModule,
  ],
  entryComponents: [NewUserComponent, EditUserComponent],
})
export class UserListModule { }
