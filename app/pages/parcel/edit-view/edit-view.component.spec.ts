import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewComponent } from './edit-view.component';
import {AppModule} from '../../../app.module';
import {Parcel} from '../../../models/Parcel';
import {Status} from '../../../models/Status';
import {Weight} from '../../../models/Weight';
import {Dimensions} from '../../../models/Dimensions';

describe('EditViewComponent', () => {
  let component: EditViewComponent;
  let fixture: ComponentFixture<EditViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditViewComponent);
    component = fixture.componentInstance;
    component.disabled = true;
    component.parcel = new Parcel();
    component.parcel.statuses = [(new Status())];
    component.parcel.expiry = new Weight();
    component.parcel.weight = new Weight();
    component.parcel.dimension = new Dimensions();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
