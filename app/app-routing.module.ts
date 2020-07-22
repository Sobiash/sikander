import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
} from '@nebular/auth';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './auth/auth-guard.service';
import {LogoutComponent} from './auth/logout/logout.component';
import {ConfirmComponent} from './pages/apps/kremo/confirm/confirm.component';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: 'kremo/',
    loadChildren: () => import('app/pages/apps/kremo/kremo.module').then(m => m.KremoModule),
  },
  {
    path: 'confirm/:parcelId',
    component: ConfirmComponent,
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbAuthComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'logout',
        component: LogoutComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
