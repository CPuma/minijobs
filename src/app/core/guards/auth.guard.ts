import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthenticationService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | any> | boolean | any {
		console.log('GUARDD');

		return new Promise((resolve, reject) => {
			console.log('en el promise');
			try {
				console.log('en el try');
				return this.authService.isAuth().subscribe(
					(user) => {
						console.log('GUARD', user);
						if (user) {
							resolve(true);
						} else {
							this.router.navigate([ '/auth/login' ]);
							resolve(false);
						}
					},
					() => {
						console.log('GUARD', false);
						this.router.navigate([ '/auth/login' ]);
						resolve(false);
					}
				);
			} catch (error) {
				console.log('ERRR');
				this.router.navigate([ '/auth/login' ]);
				reject(false);
			}
		});
	}
}
