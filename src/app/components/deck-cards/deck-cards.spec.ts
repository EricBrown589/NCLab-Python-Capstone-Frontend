import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCards } from './deck-cards';

describe('DeckCards', () => {
  let component: DeckCards;
  let fixture: ComponentFixture<DeckCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
