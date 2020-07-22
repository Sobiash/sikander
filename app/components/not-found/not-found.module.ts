import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found.component';
import {NbCardModule} from '@nebular/theme';



@NgModule({
  declarations: [NotFoundComponent],
    imports: [
        NbCardModule,
    ],
})
export class NotFoundModule { }
