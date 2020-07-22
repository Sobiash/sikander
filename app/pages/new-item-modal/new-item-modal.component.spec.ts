import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemModalComponent } from './new-item-modal.component';
import {AppModule} from '../../app.module';
import {NbDialogRef} from '@nebular/theme';

describe('NewItemModalComponent', () => {
  let component: NewItemModalComponent;
  let fixture: ComponentFixture<NewItemModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: NbDialogRef, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
