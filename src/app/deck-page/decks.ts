import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'deck-page',
    templateUrl: './decks.html',
    styleUrl: './decks.css'
})

export class DeckPage implements OnInit {

    constructor(private router: Router, public route: Router) {}

    ngOnInit(): void {
        
    }
}