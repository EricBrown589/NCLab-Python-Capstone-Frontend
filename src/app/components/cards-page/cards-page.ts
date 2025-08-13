import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../data-service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

interface CardData {
    card_id: number;
    name: string;
    price: number;
    card_uid: string;
    image_url: string;
    amount_owned: number;
}
@Component({
    selector: 'cards-page',
    imports: [CommonModule, FormsModule],
    templateUrl: './cards-page.html',
    styleUrl: './cards-page.css'
})

export class CardsPage implements OnInit {

    cardData = {
        name: ''
    }
    cards: CardData[] = [];
    pagedCards: CardData[] = [];
    currentPage = 1;
    pageSize = 12;

    constructor(private router: Router, public route: Router, private dataService: DataService) {}

    ngOnInit(): void {
        this.getCards();
    }
    
    getCards() {
        this.dataService.getCards().subscribe((data: CardData[]) => {
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

    addCard() {
        this.dataService.postCard(this.cardData).subscribe(() => {
            this.cardData.name = '';
            this.getCards();
        });
    }

    increaseAmountOwned(card: CardData) {
        card.amount_owned += 1;
        this.dataService.updateCard(card).subscribe(() => {
            this.getCards();
        });
    }
    decreaseAmountOwned(card: CardData) {
        if (card.amount_owned > 1) {
            card.amount_owned -= 1;
            this.dataService.updateCard(card).subscribe(() => {
                this.getCards();
            });
        } else if (card.amount_owned === 1){
            card.amount_owned = 0;
            this.dataService.updateCard(card).subscribe(() => {
                this.getCards();
            });
            this.dataService.deleteCard(card).subscribe(() => {
                this.getCards();
            });
        }
    }
}
