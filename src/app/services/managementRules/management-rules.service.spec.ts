import { TestBed } from '@angular/core/testing';

import { ManagementRulesService } from './management-rules.service';

describe('ManagementRulesService', () => {
  let service: ManagementRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
