import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Quote } from 'src/app/Quote.model';
import { QuoteService } from 'src/app/quote.service';

@Component({
  selector: 'app-newquotecomponent',
  templateUrl: './newquote.component.html',
  styleUrls: ['./newquote.component.scss']
})
export class NewQuoteComponent implements OnInit {
  series: string;
  episode: string;
  quote: string;
  time: string;
  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
  }

  onSubmit(quotesForm: NgForm){
    let quoteObject: any = {};
    for (const key in quotesForm.value){
        this[key] = quotesForm.value[key]
        quoteObject[key] =quotesForm.value[key];
        console.log(key, this[key])
    }

    this.quoteService.newQuote(quoteObject)
  }

}
