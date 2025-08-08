import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'card-page',
    templateUrl: './cards.html',
    styleUrl: './cards.css'
})

export class CardPage implements OnInit {

    constructor(private router: Router, public route: Router) {}

    ngOnInit(): void {
        
    }
}