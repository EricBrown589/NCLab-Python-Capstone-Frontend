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
        name: '' // Object to hold card name for adding a new card
    }
    cards: CardData[] = []; // Array to hold all cards fetched from the backend
    pagedCards: CardData[] = []; // Array to hold the current page's cards
    currentPage = 1; // Current page number
    pageSize = 12; // Number of cards to display per page
    sortKey: 'name' | 'price' | null = null; // Key to sort by, can be 'name', 'price', or null for no sorting
    sortDirection: 'asc' | 'desc' = 'asc'; // Direction of sorting, can be 'asc' or 'desc'
    selectedColors: string[] = []; // Array to hold selected colors for filtering
    selectedType: string = ''; // Variable to hold selected type for filtering

    constructor(public route: Router, private dataService: DataService, private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.getCards();
    }

    // Fetch the list of cards from the backend using the DataService and set the pagedCards
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
            this.applySorting(); // Apply sorting after fetching
            this.setPagedCards();
            this.cdr.detectChanges(); // Ensure view updates with new data
        });
    }

    // Calculate start and end indices for slicing the cards array
    setPagedCards() {
        const startIndex = (this.currentPage - 1) * this.pageSize; // Calculate the start index based on current page and page size
        const endIndex = startIndex + this.pageSize; // Define the end index for slicing
        this.pagedCards = [...this.cards.slice(startIndex, endIndex)]; // Slice the cards array to get the current page's cards
    }

    // Check if there are more pages available to go to the next page and update the pagedCards
    nextPage() {
        // Check if the current page multiplied by page size is less than the total number of cards
        if (this.currentPage * this.pageSize < this.cards.length) {
            // If there are more pages, increment the current page and update pagedCards
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

    // Send a POST request to add a new card using the DataService and refresh the card list
    addCard() {
        this.dataService.postCard(this.cardData).subscribe(() => {
            this.cardData.name = ''; // Clear the input field after adding the card
            this.getCards();
        });
    }

    // Increment the amount_owned property of the card and update it using the DataService
    increaseAmountOwned(card: CardData) {
        card.amount_owned += 1;
        this.dataService.updateCard(card).subscribe(() => {
            this.getCards();
        });
    }

    // Decrement the amount_owned property of the card and update or delete it using the DataService
    decreaseAmountOwned(card: CardData) {
        // Only decrease if amount_owned is greater than 1
        if (card.amount_owned > 1) {
            card.amount_owned -= 1;
            this.dataService.updateCard(card).subscribe(() => {
                this.getCards();
            });
        } else if (card.amount_owned === 1) {
            // If amount_owned is 1, set it to 0 and then delete the card
            card.amount_owned = 0;
            this.dataService.updateCard(card).subscribe(() => {
                this.getCards();
            });
            this.dataService.deleteCard(card).subscribe(() => {
                this.getCards();
            });
        }
    }

    // Sort cards by name in ascending order and update the pagedCards
    sortByName() {
        // If already sorted by name, toggle the direction; otherwise, set to ascending
        if (this.sortKey === 'name') {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // Set sortKey to name and default to ascending order
            this.sortKey = 'name';
            this.sortDirection = 'asc';
        }
        this.applySorting()
    }

    // Sort cards by price in ascending order and update the pagedCards
    sortByPrice() {
        // If already sorted by price, toggle the direction; otherwise, set to ascending
        if (this.sortKey === 'price') {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else { 
            // Set sortKey to price and default to ascending order
            this.sortKey = 'price';
            this.sortDirection = 'asc';
        }
        this.applySorting()
    }

    // Apply sorting based on the selected sort key and direction
    applySorting() {
        if (!this.sortKey) return; // If no sort key is selected, do nothing
        this.cards = [...this.cards].sort((a, b) => {
            // Sort by name
            if (this.sortKey === 'name') {
                // Compare names in a case-insensitive manner
                return this.sortDirection === 'asc'
                    ? a.name.localeCompare(b.name) // Ascending order
                    : b.name.localeCompare(a.name); // Descending order
            }
            // Sort by price
            if (this.sortKey === 'price') { 
                // Compare prices numerically
                return this.sortDirection === 'asc'
                    ? a.price - b.price // Ascending order
                    : b.price - a.price; // Descending order
            }
            return 0; // Default case, no sorting applied
        });
    this.setPagedCards();
    }

    // Toggle the selection of a color and update the selectedColors array
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

    // Fetch cards with selected filters and reset the current page to 1
    applyFilters() {
        this.currentPage = 1; 
        this.getCards(); 
    }

    // Clear all selected filters and sorting, reset the current page to 1, and fetch all cards
    resetPage() {
        this.selectedColors = [];
        this.selectedType = '';
        this.sortKey = null;
        this.sortDirection = 'asc';
        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            (checkbox.checked = false);
        });
        this.currentPage = 1;
        this.getCards();
    }
}
