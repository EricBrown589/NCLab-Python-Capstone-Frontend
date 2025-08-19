import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  private apiURL = 'http://localhost:5000'

  constructor(private http: HttpClient) {}

  getCards(colors: string[] = [], type?: string): Observable<CardData[]> {
    let params = new HttpParams();
    colors.forEach(c => {
      params = params.append('colors', c)
    });
    if (type) {
      params = params.set('type', type);
    }
    console.log("Query params:", params.toString());
    return this.http.get<CardData[]>(`${this.apiURL}/cards`, { params });
  }

  postCard(data: any): Observable<any> {
    const body = data
    return this.http.post<any>(`${this.apiURL}/cards/post`, body)
  }

  updateCard(card: CardData): Observable<CardData> {
    return this.http.put<CardData>(`${this.apiURL}/cards/update`, card);
  }

  deleteCard(card: CardData): Observable<any> {
    return this.http.delete(`${this.apiURL}/cards/delete/${card.card_id}`);
  }

  getDecks(): Observable<DeckData[]> {
    return this.http.get<DeckData[]>(`${this.apiURL}/decks`);
  }

  addDeck(data: any): Observable<any> {
    const body = data
    return this.http.post<any>(`${this.apiURL}/decks/add`, body)
  }

  deleteDeck(deck: DeckData): Observable<any> {
    return this.http.delete(`${this.apiURL}/decks/delete/${deck.deck_id}`);
  }

  getDeckCards(deckId: number): Observable<CardData[]> {
    return this.http.get<CardData[]>(`${this.apiURL}/decks/${deckId}/cards`);
  }

  addCardToDeck(deckId: number, cardName: string): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/decks/${deckId}/cards/add`, { name: cardName });
  }
}
