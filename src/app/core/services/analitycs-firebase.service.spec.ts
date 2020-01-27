import { TestBed } from '@angular/core/testing';

import { AnalitycsFirebaseService } from './analitycs-firebase.service';

describe('AnalitycsFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalitycsFirebaseService = TestBed.get(AnalitycsFirebaseService);
    expect(service).toBeTruthy();
  });
});
