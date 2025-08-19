import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface CardData {
  card_id: number;
  name: string;
  price: number;
  card_uid: string;
  image_url: string;
  amount_owned: number;
}

@Component({
  selector: 'app-deck-cards',
  imports: [CommonModule, FormsModule],
  templateUrl: './deck-cards.html',
  styleUrl: './deck-cards.css'
})
export class DeckCards implements OnInit {
  cards: CardData[] = [];
  deckId!: number;
  cardData = {
    name: ''
  }
  pagedCards: CardData[] = [];
  currentPage = 1;
  pageSize = 12;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to route parameters to get the deckId
    this.route.params.subscribe(params => {
      this.deckId = params['deckId'];
      this.getDeckCards(this.deckId);
    });
  }

  // Fetch the list of cards in the specified deck using the DataService and set the pagedCards
  getDeckCards(deckId: number): void {
    this.dataService.getDeckCards(this.deckId).subscribe((data: CardData[]) => {
      this.cards = data;
      this.setPagedCards();
    });
  }

  // Calculate start and end indices for slicing the cards array
  setPagedCards() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCards = this.cards.slice(startIndex, endIndex); // Slice the cards array to get the current page's cards
  }

  // Check if there are more pages available to go to the next page and update the pagedCards
  nextPage() {
    if (this.currentPage * this.pageSize < this.cards.length) {
      this.currentPage++;
      this.setPagedCards();
    }
  }

  // Check if the current page is greater than 1 to go to the previous page and update the pagedCards
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPagedCards();
    }
  }

  // Calculate the total number of pages based on the total number of cards and page size
  getTotalPages(): number {
    return Math.ceil(this.cards.length / this.pageSize);
  }

  // Add a card to the specified deck using the DataService and refresh the card list
  addCardToDeck(cardName: string): void {
    this.dataService.addCardToDeck(this.deckId, this.cardData.name).subscribe(() => {
      this.getDeckCards(this.deckId);
    });
  }
}
