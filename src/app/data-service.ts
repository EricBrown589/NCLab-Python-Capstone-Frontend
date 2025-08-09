import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CardData {
  name: string;
  price: number;
  image_url: string;
  amountOwned: number;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = 'http://localhost:5000'

  constructor(private http: HttpClient) {}

  getCards(): Observable<CardData[]> {
    return this.http.get<CardData[]>(`${this.apiURL}/cards`);
  }

  postCard(data: any): Observable<any> {
    const body = data
    return this.http.post<any>(`${this.apiURL}/cards/post`, body)
  }
}
