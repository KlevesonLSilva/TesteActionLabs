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
  exchangeRate: number | undefined;
  expanded: boolean = false;


 

  constructor(private service: ServiceService) { 
    this.currencyForm = new FormGroup({
      fromSymbol: new FormControl(''),
      toSymbol: new FormControl('BRL')
    });
  }

  

  ngOnInit(): void {
    
  }

  getExchangeRate() {
    this.getdailyExchangeRate();
    const formSymbolControl = this.currencyForm.get('fromSymbol');
    const fromSymbol = formSymbolControl ? formSymbolControl.value : '';
    const toSymbol = 'BRL';
  
    this.service.getCurrentExchangeRate(fromSymbol, toSymbol)
      .subscribe((data: any) => {
        this.exchangeRate = data?.exchange_rate;
        // Processar a resposta da requisição aqui
      });
  }

  getdailyExchangeRate() {
    const formSymbolControl = this.currencyForm.get('fromSymbol');
    const fromSymbol = formSymbolControl ? formSymbolControl.value : '';
    const toSymbol = 'BRL';
  
    this.service.getdailyExchangeRate(fromSymbol, toSymbol)
      .subscribe((data: any) => {
        this.exchangeRate = data?.exchange_rate;
        // Processar a resposta da requisição aqui
      });
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }
  

}
