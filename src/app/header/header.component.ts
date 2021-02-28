import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  _isLoggedIn: boolean;
  user: string;

  private sub: Subscription;

  constructor( private userService: UserService ) { }

  ngOnInit(): void {
    this.sub = this.userService.user.subscribe(value => {
      if(value && value.username){
        this.user = value.username; 
        this._isLoggedIn = true;
    }
  }
    )
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

  open(){
    document.getElementById('navbarSupportedContent').classList.toggle("visible")
  }

  logOut(){
    this._isLoggedIn = false;
    this.userService.logOut();
  }

}
