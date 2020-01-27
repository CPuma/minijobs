import { TestBed } from '@angular/core/testing';

import { TrabajosFirebaseService } from './trabajos-firebase.service';

describe('TrabajosFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrabajosFirebaseService = TestBed.get(TrabajosFirebaseService);
    expect(service).toBeTruthy();
  });
});
