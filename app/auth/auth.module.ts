import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule} from '@nebular/theme';
import {NbAuthModule} from '@nebular/auth';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {PagesRoutingModule} from '../pages/pages-routing.module';
import {LoginComponent} from './login/login.component';
import {authStrategy} from './auth-strategy';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    PagesRoutingModule,
    NbAuthModule, NbAuthModule.forRoot(authStrategy), NbCardModule,
  ],
  declarations: [
    LoginComponent,
    LogoutComponent,
  ],
})
export class AuthModule { }
