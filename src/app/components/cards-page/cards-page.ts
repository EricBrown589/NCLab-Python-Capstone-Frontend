import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../data-service";
import { CommonModule } from "@angular/common";
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
    sortbyNameAsc = true;
    sortbyPriceAsc = true;
    selectedColors: string[] = [];
    selectedType: string = '';

    constructor(public route: Router, private dataService: DataService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getCards();
    }
    
    getCards() {
        console.log('Fetching with colors:', this.selectedColors, 'type:', this.selectedType);
        this.dataService.getCards(this.selectedColors, this.selectedType).subscribe((cards: CardData[]) => {
            console.log("Backend returned:", cards.length, "cards");
            if (Array.isArray(cards)) {
                this.cards = [...cards];
            } else {
                console.error('Expected an array of cards, but received:', cards);
                this.cards = [];
            }
            this.currentPage = 1; // Reset to first page on new fetch
            this.setPagedCards();
            this.cdr.detectChanges(); // Ensure view updates with new data
        });
    }

    setPagedCards() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedCards = [...this.cards.slice(startIndex, endIndex)];
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

    sortByName() {
        this.cards.sort((a, b) => 
            this.sortbyNameAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        this.sortbyNameAsc = !this.sortbyNameAsc;
        this.setPagedCards();
    }

    sortByPrice() {
        this.cards.sort((a, b) => 
            this.sortbyPriceAsc ? a.price - b.price : b.price - a.price
        );
        this.sortbyPriceAsc = !this.sortbyPriceAsc;
        this.setPagedCards();
    }

    toggleColor(color: string, event: any) {
        if (event.target.checked) {
            if (!this.selectedColors.includes(color)) {
                this.selectedColors = [...this.selectedColors, color];
            }
        } else {
            this.selectedColors = this.selectedColors.filter(c => c !== color);
        }
        console.log("After toggle:", this.selectedColors);
    }

    applyFilters() {
        this.currentPage = 1; // Reset to first page on filter change
        this.getCards(); // Fetch cards with updated filters
    }

    clearFilters() {
        // Clear selected colors and type
        this.selectedColors = [];
        this.selectedType = '';
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            (checkbox.checked = false);
        });
        // Reset paged cards and current page
        this.currentPage = 1; // Reset to first page on filter clear
        this.getCards(); // Fetch all cards without filters
    }
}
