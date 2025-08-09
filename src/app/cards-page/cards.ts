import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data-service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { FormsModule } from "@angular/forms";

interface CardData {
    name: string;
    price: number;
    image_url: string;
    amountOwned: number;
}
@Component({
    selector: 'card-page',
    imports: [CommonModule, FormsModule],
    templateUrl: './cards.html',
    styleUrl: './cards.css'
})

export class CardPage implements OnInit {

    cards$!: Observable<CardData[]>;
    cardData = {
        name: ''
    }

    constructor(private router: Router, public route: Router, private dataService: DataService) {}

    ngOnInit(): void {
        this.getCards();
    }
    
    getCards() {
        this.cards$ = this.dataService.getCards()
        console.log(this.cards$)
    }

    sendCard() {
        this.dataService.postCard(this.cardData).subscribe(() => {
            this.getCards();
        });
    }
}