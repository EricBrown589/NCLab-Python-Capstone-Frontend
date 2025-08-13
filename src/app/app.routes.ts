import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page'
import { CardsPage } from './components/cards-page/cards-page';
import { DeckPage } from './components/deck-page/deck-page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'cards',
        component: CardsPage,
    },
    {
        path: 'decks',
        component: DeckPage,
    },
    // {
    //     path: '**',
    //     component: NotFound,
    // } 
];
