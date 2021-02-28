import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { UserService } from "./user.service"
import { map, take } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router){ };

    canActivate()
    : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        console.log("AUth guard");
      return  this.userService.user.pipe(map(newUser => {
  console.log(newUser)
        if(newUser && newUser.token){
            return true
        }else{
            return this.router.createUrlTree(['/login']);
        }
      }
      )
      ) 
    }

}