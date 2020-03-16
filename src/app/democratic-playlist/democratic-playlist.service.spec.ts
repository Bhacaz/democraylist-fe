import { TestBed } from '@angular/core/testing';

import { DemocraticPlaylistService } from './democratic-playlist.service';

describe('DemocraticPlaylistService', () => {
  let service: DemocraticPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemocraticPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
