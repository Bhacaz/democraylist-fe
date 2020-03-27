import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSummaryComponent } from './playlist-summary.component';

describe('PlaylistSummaryComponent', () => {
  let component: PlaylistSummaryComponent;
  let fixture: ComponentFixture<PlaylistSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
