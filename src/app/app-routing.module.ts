import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthpageComponent } from "./authpage/authpage.component";
import { NewQuoteComponent } from "./welcome/newquote/newquote.component"
import { AuthGuard } from './authguard.service';
import { Err404Component } from './err404/err404.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo:'quotes'},
  {path: 'quotes/new', pathMatch: "full", component: NewQuoteComponent, canActivate: [AuthGuard]},
  {path: "quotes", component: WelcomeComponent}, 
  {path: "login", component: AuthpageComponent },
  {path: "register", component:AuthpageComponent },
  {path: '**' , component: Err404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
