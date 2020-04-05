import { TestBed } from '@angular/core/testing';

import { PlaylistChangeService } from './playlist-change.service';

describe('PlaylistChangeService', () => {
  let service: PlaylistChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaylistChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
