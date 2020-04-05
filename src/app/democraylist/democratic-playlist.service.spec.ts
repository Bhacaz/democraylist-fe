import { TestBed } from '@angular/core/testing';

import { DemocraylistService } from './democraylist.service';

describe('DemocraylistService', () => {
  let service: DemocraylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemocraylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
