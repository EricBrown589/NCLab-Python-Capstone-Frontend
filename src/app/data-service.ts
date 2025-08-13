import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CardData {
  card_id: number;
  name: string;
  price: number;
  card_uid: string;
  image_url: string;
  amount_owned: number;
}

interface DeckData {
  deck_id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'http://localhost:5000' // Base URL for the backend API

  constructor(private http: HttpClient) {}

  // Fetch the list of cards from the backend
  getCards(): Observable<CardData[]> {
    return this.http.get<CardData[]>(`${this.apiURL}/cards`);
  }

  // Send a POST request to add a new card
  postCard(data: any): Observable<any> {
    const body = data
    return this.http.post<any>(`${this.apiURL}/cards/post`, body)
  }

  // Send a PUT request to update an existing cards amount_owned
  updateCard(card: CardData): Observable<CardData> {
    return this.http.put<CardData>(`${this.apiURL}/cards/update`, card);
  }

  // Send a DELETE request to remove a card by its ID
  deleteCard(card: CardData): Observable<any> {
    return this.http.delete(`${this.apiURL}/cards/delete/${card.card_id}`);
  }

  // Fetch the list of decks from the backend
  getDecks(): Observable<DeckData[]> {
    return this.http.get<DeckData[]>(`${this.apiURL}/decks`);
  }

  // Send a POST request to add a new deck
  addDeck(data: any): Observable<any> {
    const body = data
    return this.http.post<any>(`${this.apiURL}/decks/add`, body)
  }

  // Send a DELETE request to remove a deck by its ID
  deleteDeck(deck: DeckData): Observable<any> {
    return this.http.delete(`${this.apiURL}/decks/delete/${deck.deck_id}`);
  }

  // Fetch cards associated with a specific deck by its ID
  getDeckCards(deckId: number): Observable<CardData[]> {
    return this.http.get<CardData[]>(`${this.apiURL}/decks/${deckId}/cards`);
  }

  // Send a POST request to add a card to a specific deck by its ID
  addCardToDeck(deckId: number, cardName: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/decks/${deckId}/cards/add`, { name: cardName });
  }
}
