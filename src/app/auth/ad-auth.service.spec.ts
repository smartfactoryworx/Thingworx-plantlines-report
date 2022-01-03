import { TestBed } from '@angular/core/testing';

import { AdAuthService } from './ad-auth.service';

describe('AdAuthService', () => {
  let service: AdAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
