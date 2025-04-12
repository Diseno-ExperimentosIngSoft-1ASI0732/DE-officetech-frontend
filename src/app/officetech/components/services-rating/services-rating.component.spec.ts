import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRatingComponent } from './services-rating.component';

describe('ServicesRatingComponent', () => {
  let component: ServicesRatingComponent;
  let fixture: ComponentFixture<ServicesRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicesRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
