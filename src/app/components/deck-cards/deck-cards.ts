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

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.deckId = params['deckId'];
      this.getDeckCards(this.deckId);
  });
    
  }

  getDeckCards(deckId: number): void {
    this.dataService.getDeckCards(this.deckId).subscribe((data: CardData[]) => {
      this.cards = data;
      this.setPagedCards();
    });
  }

  setPagedCards() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedCards = this.cards.slice(startIndex, endIndex);
    }

    nextPage() {
        if (this.currentPage * this.pageSize < this.cards.length) {
            this.currentPage++;
            this.setPagedCards();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.setPagedCards();
        }
    }

    getTotalPages(): number {
        return Math.ceil(this.cards.length / this.pageSize);
    }

  addCardToDeck(cardName: string): void {
    this.dataService.addCardToDeck(this.deckId, this.cardData.name).subscribe(() => {
      this.getDeckCards(this.deckId);
    });
  }
}
