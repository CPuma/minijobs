import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUsuarioDetallesComponent } from './modal-usuario-detalles.component';

describe('ModalUsuarioDetallesComponent', () => {
  let component: ModalUsuarioDetallesComponent;
  let fixture: ComponentFixture<ModalUsuarioDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUsuarioDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUsuarioDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
