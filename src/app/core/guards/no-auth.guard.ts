import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | any> | boolean | any {
		console.log('GUARDD');

		return new Promise((resolve, reject) => {
			console.log('en el promise');
			try {
				console.log('en el try');
				return this.authService.isAuth().subscribe(
					(user) => {
						console.log('GUARD no auth', user);
						if (!!user) {
							this.router.navigate([ '/admin' ]);
							resolve(false);
            } else {
							resolve(true);
						}
					},
					() => {
						console.log('GUARD no auth', false);
						this.router.navigate([ '/admin' ]);
						resolve(false);
					}
				);
			} catch (error) {
				console.log('ERRR no auth');
				// this.router.navigate([ 'admin' ]);
				reject(false);
			}
		});
	}
}
