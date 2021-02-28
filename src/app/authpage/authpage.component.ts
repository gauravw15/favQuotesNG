import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "../User";
import { NgForm } from '@angular/forms';
import { UserService } from "../user.service"
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authpage',
  templateUrl: './authpage.component.html',
  styleUrls: ['./authpage.component.scss']
})
export class AuthpageComponent implements OnInit {

  authMode = "login";
  password = "";
  username: string;
  email = "";
  sub: Subscription;
  failed = false;
  
  constructor(private location: Location, private userService: UserService, private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.authMode = location.href.split('/')[3];
  }

  onSubmit(form: NgForm){
    if (this.authMode === "login") {
      this.userService.login(this.email, this.password)
    }
    else {
      this.userService.signup(this.email, this.password, this.username)
    }
    form.reset();

    this.sub = this.userService.user.subscribe(value => {
      if(value && value.username){
        this.router.navigate(['/quotes'],{ relativeTo: this.route.parent })
        this.failed = false;
      }else if(!value || value.token == "failed"){
        //TODO
        //is a bug here
        this.failed = true
      }
    })

  }

  onDestroy(){
    this.sub.unsubscribe();
  }

  changeAuthMode(): void {
    if (this.authMode === "login") {
      this.authMode = "register";
    } else {
      this.authMode = "login"
    }
    this.failed = false;
    this.location.replaceState(this.authMode)
  }
}
