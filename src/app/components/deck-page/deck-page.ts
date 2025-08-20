import { Component, OnInit, ChangeDetectorRef  } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../data-service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";


interface DeckData {
    deck_id: number;
    name: string;
}
@Component({
    selector: 'deck-page',
    templateUrl: './deck-page.html',
    styleUrl: './deck-page.css',
    imports: [CommonModule, FormsModule, RouterLink],
})

export class DeckPage implements OnInit {
    deckData = {
        name: ''
    }
    decks: DeckData[] = [];
    pagedDecks: DeckData[] = [];
    currentPage = 1;
    pageSize = 10;

    constructor(public route: Router, private dataService: DataService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getDecks();
    }

    // Fetch the list of decks from the backend using the DataService and set the pagedDecks
    getDecks() {
        this.dataService.getDecks().subscribe((data: DeckData[]) => {
            this.decks = data;
            this.setPagedDecks();
            this.cdr.detectChanges();
        });
    }

    // Calculate start and end indices for slicing the decks array
    setPagedDecks() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.pagedDecks = this.decks.slice(startIndex, endIndex); // Slice the decks array to get the current page's decks
    }

    // Check if there are more pages available to go to the next page and update the pagedDecks
    nextPage() {
        if (this.currentPage * this.pageSize < this.decks.length) {
            this.currentPage++;
            this.setPagedDecks();
        }
    }

    // Check if the current page is greater than 1 to go to the previous page and update the pagedDecks
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.setPagedDecks();
        }
    }

    // Calculate the total number of pages based on the total number of decks and page size
    getTotalPages(): number {
        return Math.ceil(this.decks.length / this.pageSize);
    }

    // Add a new deck using the DataService and refresh the deck list
    addDeck() {
        this.dataService.addDeck(this.deckData).subscribe(() => {
            this.deckData.name = '';
            this.getDecks();
        });
    }

    // Delete a deck after user confirmation and refresh the deck list
    deleteDeck(deck: DeckData) {
        if (window.confirm(`Are you sure you want to delete the deck "${deck.name}"?`)) {
            this.dataService.deleteDeck(deck).subscribe(() => {
                this.getDecks();
            });
        }
    }
}