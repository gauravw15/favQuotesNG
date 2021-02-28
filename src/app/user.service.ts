import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './User';

@Injectable({ providedIn: 'root' })

export class UserService {
    url = 'https://radiant-hamlet-77019.herokuapp.com';  // 'http://localhost:3003' //  //
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {
        let token = localStorage.getItem("token");

        if (token) {
            this.http.get<Response>(`${this.url}/verify/${token}`).pipe(catchError(e => this.handleError(e)), tap(responseData => {
                this.handleAuth(responseData['username'], token);
            }))
                .subscribe()
        }
    }

    logOut() {
        localStorage.removeItem("token");
        const user = new User(null, null);
        this.user.next(user);
        this.router.navigate(['/login'])
    }

    private handleAuth(username: string, _token: string) {
        const newUser = new User(username, _token);
        localStorage.setItem("token", _token)
        this.user.next(newUser);
    }

    handleError(e: Response,) {
        if (e.status === 401 && localStorage.getItem('token')) {
            localStorage.removeItem("token")
        }
        this.router.navigate(['/login'])
        return throwError;
    }

    handleSignUpError(e: Response) {
        return throwError;
    }

    handleLoginError(error: any, caught: Observable<Response>){
        return throwError(error);
    }

    signup(email: string, password: string, username: string) {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        this.http.post<Response>(`${this.url}/register`, { email, password, username }, options).
            pipe(catchError(this.handleError), tap(responseData  => {
                this.handleAuth(username, responseData['token']);
            })).subscribe();
    }

    login(email: string, password: string) {
        const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        this.http.post<Response>(`${this.url}/login`, { email, password }, options).pipe(
            catchError(this.handleLoginError),
            tap(responseData => {
                this.handleAuth(responseData['username'], responseData['token'])
            }
            ))
            .subscribe()
    }
}