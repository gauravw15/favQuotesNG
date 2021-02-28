import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import {  take, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Quote } from './Quote.model';


@Injectable({providedIn: 'root'})

export class QuoteService {
    url = 'https://radiant-hamlet-77019.herokuapp.com/quotes'; //'http://localhost:3003/quotes'; //
    quotes = new Subject<Quote[]>();
    _quotes = [];
    constructor(private http: HttpClient, private userService: UserService){}

    newQuote(object: any){
        let token: String = null;
    this.userService.user.pipe(take(1)).subscribe(resp => {
        token = resp.token;
    });
    const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `${token}`
        })
        };
        this.http.post<Response>(`${this.url}/new`, object, httpOptions).pipe(map(added => {
            this._quotes.push(object);
        })).subscribe(resp => console.log(resp)) 
    }

    notifyChange(quotesList: any[]){
        let quotesArray = []
        quotesList.forEach((oneQuote => {
            let { quote, series, time, episode } = oneQuote;
            let newQuote =  { quote, series, time, episode };
            quotesArray.push(newQuote);
        }))
        this._quotes = quotesArray;
        this.quotes.next(this._quotes);
    }

    
    fetchAllQuotes(){
        this.getFromNetwork();
    /*    let quotes = sessionStorage.getItem("quotes")
        if(quotes){
            let quotesList = JSON.parse(quotes) as any[];
            console.log("From Session")
            this.notifyChange(quotesList);
        }else{
            console.log("From network")
           
        }   */
    }

    getFromNetwork(){
       this.http.get<any[]>(`${this.url}`).pipe(map(quotesList => {
           this.notifyChange(quotesList);
           sessionStorage.setItem("quotes", JSON.stringify(quotesList))
    })).subscribe();
    }
}