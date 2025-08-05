import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page'
import { CardPage } from './cards-page/cards';
import { DeckPage } from './deck-page/decks';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'cards',
        component: CardPage,
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
