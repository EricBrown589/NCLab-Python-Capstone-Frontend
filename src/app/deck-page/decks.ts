import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


interface DeckData {
    deck_id: number;
    name: string;
}
@Component({
    selector: 'deck-page',
    templateUrl: './decks.html',
    styleUrl: './decks.css',
    imports: [CommonModule, FormsModule],
})

export class DeckPage implements OnInit {
    deckData = {
        name: ''
    }
    decks: DeckData[] = [];
    pagedDecks: DeckData[] = [];
    currentPage = 1;
    pageSize = 10;

    constructor(private router: Router, public route: Router, private dataService: DataService) {}

    ngOnInit(): void {
        this.getDecks();
    }

    getDecks() {
        this.dataService.getDecks().subscribe((data: DeckData[]) => {
            this.decks = data;
            this.setPagedDecks();
        });
    }

    setPagedDecks() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedDecks = this.decks.slice(startIndex, endIndex);
    }

    nextPage() {
        if (this.currentPage * this.pageSize < this.decks.length) {
            this.currentPage++;
            this.setPagedDecks();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.setPagedDecks();
        }
    }

    getTotalPages(): number {
        return Math.ceil(this.decks.length / this.pageSize);
    }

    addDeck() {
        this.dataService.addDeck(this.deckData).subscribe(() => {
            this.deckData.name = '';
            this.getDecks();
        });
    }

    deleteDeck(deck: DeckData) {
        this.dataService.deleteDeck(deck).subscribe(() => {
            this.getDecks();
        });
    }
}