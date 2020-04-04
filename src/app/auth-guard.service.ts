import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

// import { Observable } from 'rxjs/observable';
import { Observable } from '../../node_modules/rxjs/';
import { TokenDecode } from './shared/tokenDecoder';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private router: Router) { }
    show = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const tok = TokenDecode.getDecodedAccessToken();

        if (tok) {
            this.show = true;
            return true;

        } else {
            this.show = false;
            this.router.navigate(['']);
        }

    }
}
