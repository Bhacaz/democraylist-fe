import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryNotifComponent } from './try-notif.component';

describe('TryNotifComponent', () => {
  let component: TryNotifComponent;
  let fixture: ComponentFixture<TryNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
