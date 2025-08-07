import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../data-service";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

@Component({
    selector: 'card-page',
    imports: [CommonModule],
    templateUrl: './cards.html',
    styleUrl: './cards.css'
})

export class CardPage implements OnInit {

    cards$!: Observable<any[]>;


    constructor(private router: Router, public route: Router, private dataService: DataService) {}

    ngOnInit(): void {
        this.cards$ = this.dataService.getCards();
    }

    

    public onClick(value: string) {
        if (value == "deck") {
            this.router.navigateByUrl('/decks')
        }
        else if (value == "home") {
            this.router.navigateByUrl('')
        }
    }
}