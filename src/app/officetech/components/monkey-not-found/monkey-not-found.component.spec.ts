import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonkeyNotFoundComponent } from './monkey-not-found.component';

describe('MonkeyNotFoundComponent', () => {
  let component: MonkeyNotFoundComponent;
  let fixture: ComponentFixture<MonkeyNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonkeyNotFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonkeyNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
