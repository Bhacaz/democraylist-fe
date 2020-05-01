import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayslitAddTrackComponent } from './playslit-add-track.component';

describe('PlayslitAddTrackComponent', () => {
  let component: PlayslitAddTrackComponent;
  let fixture: ComponentFixture<PlayslitAddTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayslitAddTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayslitAddTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
