import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {UserListComponent} from './user-list/user-list.component';
import { RolesComponent } from './roles/roles.component';
import {ReceiveComponent} from './receive/receive.component';
import {ParcelComponent} from './parcel/parcel.component';
import {SearchComponent} from './search/search.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {KremoComponent} from './apps/kremo/kremo.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'users',
      component: UserListComponent,
    },
    {
      path: 'roles',
      component: RolesComponent,
    },
    {
      path: 'receiving',
      component: ReceiveComponent,
    },
    {
      path: 'kremo',
      component: KremoComponent,
    },
    {
      path: 'notifications',
      component: NotificationsComponent,
    },
    {
      path: 'search',
      component: SearchComponent,
    },
    {
      path: 'track/:id',
      component: ParcelComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
