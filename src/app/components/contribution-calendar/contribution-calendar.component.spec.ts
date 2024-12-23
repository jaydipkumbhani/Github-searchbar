import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionCalendarComponent } from './contribution-calendar.component';

describe('ContributionCalendarComponent', () => {
  let component: ContributionCalendarComponent;
  let fixture: ComponentFixture<ContributionCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
