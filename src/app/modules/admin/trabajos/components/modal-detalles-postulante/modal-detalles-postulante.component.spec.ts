import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesPostulanteComponent } from './modal-detalles-postulante.component';

describe('ModalDetallesPostulanteComponent', () => {
  let component: ModalDetallesPostulanteComponent;
  let fixture: ComponentFixture<ModalDetallesPostulanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesPostulanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
