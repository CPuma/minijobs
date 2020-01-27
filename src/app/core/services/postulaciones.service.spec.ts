import { TestBed } from '@angular/core/testing';

import { PostulacionesService } from './postulaciones.service';

describe('PostulacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostulacionesService = TestBed.get(PostulacionesService);
    expect(service).toBeTruthy();
  });
});
