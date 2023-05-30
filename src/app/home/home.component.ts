import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currencyForm: FormGroup;
  exchangeRate: number = 0;
  expanded: boolean = false;
  lastUpdatedAt: string = '';
  dailyExchangeRates: any[] = [];
  previousClose: number = 0;


 

  constructor(private service: ServiceService) { 
    this.currencyForm = new FormGroup({
      fromSymbol: new FormControl(''),
      toSymbol: new FormControl('BRL')
    });
  }

  

  ngOnInit(): void {
    
  }

  getExchangeRate() {
    const formSymbolControl = this.currencyForm.get('fromSymbol');
    const fromSymbol = formSymbolControl ? formSymbolControl.value : '';
    const toSymbol = 'BRL';
  
    this.service.getCurrentExchangeRate(fromSymbol, toSymbol)
    .subscribe((data: any) => {
      if (data.success) {
        this.getdailyExchangeRate();
        this.exchangeRate = data.exchangeRate.toFixed(2).replace('.', ',');
        const lastUpdatedAt = new Date(data.lastUpdatedAt);
        this.lastUpdatedAt = this.formatDate(lastUpdatedAt.toString());
      }
    });
  }

  getdailyExchangeRate() {
    const formSymbolControl = this.currencyForm.get('fromSymbol');
    const fromSymbol = formSymbolControl ? formSymbolControl.value : '';
    const toSymbol = 'BRL';
  
    this.service.getdailyExchangeRate(fromSymbol, toSymbol)
      .subscribe((data: any) => {
        this.dailyExchangeRates = data.data;
        this.calculateCloseDiff();
      });
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);
  
    return `${day}/${month}/${year}`;
  }
  
  
  formatNumberWithLeadingZero(number: number) {
    return number < 10 ? `0${number}` : `${number}`;
  }
  
  calculateCloseDiff() {
    for (let i = 0; i < this.dailyExchangeRates.length; i++) {
      const currentRate = this.dailyExchangeRates[i];
      const previousRate = this.dailyExchangeRates[i - 1];
      if (previousRate) {
        currentRate.closeDiff = ((currentRate.close - previousRate.close) / previousRate.close) * 100;
      } else {
        currentRate.closeDiff = 0;
      }
    }
  }

  getDiffClass(diff: number) {
    if (diff === null) {
      return 'neutral';
    } else if (diff > 0) {
      return 'positive';
    } else {
      return 'negative';
    }
  }
  

}
