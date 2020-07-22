import { ConfirmComponent } from './confirm/confirm.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'confirm/:parcelId',
      component: ConfirmComponent,
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KremoRoutingModule { }
