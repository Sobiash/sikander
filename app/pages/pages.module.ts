import { NgModule } from '@angular/core';
import { NbCardModule, NbInputModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { UserListModule } from './user-list/user-list.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { ReceiveModule } from './receive/receive.module';
import { RolesModule } from './roles/roles.module';
import { ParcelModule } from './parcel/parcel.module';
import { SearchModule } from './search/search.module';
import { NotificationsModule } from './notifications/notifications.module';
import { KremoModule } from './apps/kremo/kremo.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    UserListModule,
    KremoModule,
    NbMenuModule,
    AuthModule,
    SearchModule,
    NotificationsModule,
    DashboardModule,
    ProfileModule,
    ReceiveModule,
    NbInputModule,
    NbCardModule,
    RolesModule,
    ParcelModule,
  ],
  declarations: [PagesComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class PagesModule { }
