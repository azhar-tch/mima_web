import { TestBed } from '@angular/core/testing';

import { DutiesService } from './duties.service';

describe('DutiesService', () => {
  let service: DutiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DutiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
