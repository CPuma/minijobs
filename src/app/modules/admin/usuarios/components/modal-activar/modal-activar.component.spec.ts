import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivarComponent } from './modal-activar.component';

describe('ModalActivarComponent', () => {
  let component: ModalActivarComponent;
  let fixture: ComponentFixture<ModalActivarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActivarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
