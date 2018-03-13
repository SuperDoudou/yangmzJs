import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {UserCenterPageComponent} from './user-center-page.component';

describe('UserCenterPageComponent', () => {
  let component: UserCenterPageComponent;
  let fixture: ComponentFixture<UserCenterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCenterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
