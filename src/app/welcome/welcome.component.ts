import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteService } from '../quote.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  sub: Subscription;
  isLoggedIn = false;
  quotesList = [];
  constructor(private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.fetchAllQuotes();
    this.sub = this.quoteService.quotes.pipe(map(quotesArray => {
      this.quotesList = quotesArray;
    })).subscribe();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
