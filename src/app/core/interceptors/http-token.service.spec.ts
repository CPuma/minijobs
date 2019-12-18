import { TestBed } from '@angular/core/testing';

import { HttpTokenService } from './http-token.service';

describe('HttpTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpTokenService = TestBed.get(HttpTokenService);
    expect(service).toBeTruthy();
  });
});
