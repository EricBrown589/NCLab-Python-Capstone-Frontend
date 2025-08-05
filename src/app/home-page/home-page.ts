import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'home-page',
    templateUrl: './home-page.html',
    styleUrl: './home-page.css'
})

export class HomePage implements OnInit {

    constructor(private router: Router, public route: Router) {}

    ngOnInit(): void {
        
    }

    public onClick(value: string) {
        if (value == "card") {
            this.router.navigateByUrl('/cards')
        }
        else if (value == "deck") {
            this.router.navigateByUrl('/decks')
        }
    }
}

