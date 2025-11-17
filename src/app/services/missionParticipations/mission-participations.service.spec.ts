import { TestBed } from '@angular/core/testing';

import { MissionParticipationsService } from './mission-participations.service';

describe('MissionParticipationsService', () => {
  let service: MissionParticipationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionParticipationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
