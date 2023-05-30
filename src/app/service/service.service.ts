import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://api-brl-exchange.actionlabs.com.br/api/1.0/open';
  

  constructor(private http: HttpClient) { }

  getCurrentExchangeRate(fromSymbol: string, toSymbol: string) {
    const params = new HttpParams()
      .set('apiKey', 'RVZG0GHEV2KORLNA')
      .set('from_symbol', fromSymbol)
      .set('to_symbol', 'BRL');

    return this.http.get(`${this.apiUrl}/currentExchangeRate`, { params });
  }

  getdailyExchangeRate(fromSymbol: string, toSymbol: string) {
    const params = new HttpParams()
      .set('apiKey', 'RVZG0GHEV2KORLNA')
      .set('from_symbol', fromSymbol)
      .set('to_symbol', 'BRL');

    return this.http.get(`${this.apiUrl}/dailyExchangeRate`, { params });
  }
}
