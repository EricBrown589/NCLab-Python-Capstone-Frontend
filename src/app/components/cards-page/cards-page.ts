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
    sortbyNameAsc = true;
    sortbyPriceAsc = true;

    constructor(public route: Router, private dataService: DataService) { }

    ngOnInit(): void {
        this.getCards();
    }

    // Fetch the list of cards from the backend using the DataService and set the pagedCards
    getCards() {
        this.dataService.getCards().subscribe((data: CardData[]) => {
            this.cards = data;
            this.setPagedCards();
        });
    }

    // Calculate start and end indices for slicing the cards array
    setPagedCards() {
        const startIndex = (this.currentPage - 1) * this.pageSize; // Calculate the start index based on current page and page size
        const endIndex = startIndex + this.pageSize; // Define the end index for slicing
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

    // Sort cards by name in ascending or descending order based on the sortbyNameAsc boolean
    sortByName() {
        this.cards.sort((a, b) =>
            // ternary operator if sortbyNameAsc is true, 
            this.sortbyNameAsc
                // sort ascending A -> Z
                ? a.name.localeCompare(b.name)
                // else sort descending Z -> A 
                : b.name.localeCompare(a.name)
        );
        this.sortbyNameAsc = !this.sortbyNameAsc; // toggle the boolean
        this.setPagedCards();   // update the pagedCards after sorting
    }

    // Sort cards by price in ascending or descending order based on the sortbyPriceAsc boolean
    sortByPrice() {
        this.cards.sort((a, b) =>
            // ternary operator if sortbyPriceAsc is true,
            this.sortbyPriceAsc
                // sort ascending 0 -> 9
                ? a.price - b.price
                // else sort descending 9 -> 0
                : b.price - a.price
        );
        this.sortbyPriceAsc = !this.sortbyPriceAsc; // toggle the boolean
        this.setPagedCards(); // update the pagedCards after sorting
    }
}
