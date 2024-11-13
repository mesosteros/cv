import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReelComponent } from './card-reel.component';

describe('CardReelComponent', () => {
  let component: CardReelComponent;
  let fixture: ComponentFixture<CardReelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
