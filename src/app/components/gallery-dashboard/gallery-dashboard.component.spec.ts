import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDashboardComponent } from './gallery-dashboard.component';

describe('GalleryDashboardComponent', () => {
  let component: GalleryDashboardComponent;
  let fixture: ComponentFixture<GalleryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
