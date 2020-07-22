import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogNewComponent } from './log-new.component';
import {AppModule} from '../../../app.module';
import {NbDialogRef} from '@nebular/theme';

describe('LogNewComponent', () => {
  let component: LogNewComponent;
  let fixture: ComponentFixture<LogNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{provide: NbDialogRef, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
