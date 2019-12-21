import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { resolve } from 'url';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthenticationService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | any> | boolean | any {
		console.log('GUARDD');
		this.authService.isAuth().subscribe(
			(user) => {
				if (user) {
					console.log('GUARD', user);
					return true;
				}
			},
			() => {
				console.log('GUARD', false);
				this.router.navigate([ '/auth/login' ]);
				return false;
      }
      
		);
	}
}
