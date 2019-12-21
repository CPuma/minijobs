import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionesDeServicioComponent } from './condiciones-de-servicio.component';

describe('CondicionesDeServicioComponent', () => {
  let component: CondicionesDeServicioComponent;
  let fixture: ComponentFixture<CondicionesDeServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicionesDeServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicionesDeServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
