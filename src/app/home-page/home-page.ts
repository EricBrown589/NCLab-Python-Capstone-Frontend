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
}

