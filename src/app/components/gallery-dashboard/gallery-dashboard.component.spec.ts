import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallaryDashboardComponent } from './gallery-dashboard.component';

describe('GallaryDashboardComponent', () => {
  let component: GallaryDashboardComponent;
  let fixture: ComponentFixture<GallaryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallaryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GallaryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
