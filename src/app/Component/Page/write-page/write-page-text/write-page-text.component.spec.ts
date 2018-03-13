import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePageTextComponent } from './write-page-text.component';

describe('WritePageTextComponent', () => {
  let component: WritePageTextComponent;
  let fixture: ComponentFixture<WritePageTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritePageTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritePageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
