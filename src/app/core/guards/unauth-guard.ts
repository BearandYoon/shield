import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Injectable()
export class UnauthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}