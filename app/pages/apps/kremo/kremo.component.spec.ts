import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KremoComponent } from './kremo.component';

describe('KremoComponent', () => {
  let component: KremoComponent;
  let fixture: ComponentFixture<KremoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KremoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KremoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
