import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {
	isAuth: boolean = false;
	constructor(private authService: AuthenticationService, private router: Router) {}

	ngOnInit() {
		this.authService.isAuth().subscribe(
			(user) => {
				if (user) {
					console.log('sesion Iniciada');
					this.isAuth = true;
				} else {
					console.log('No hya Session');
					this.isAuth = false;
				}
				console.log(user);
			},
			(error) => console.error(error)
		);
		console.log('Autn', this.isAuth);
	}
	logout() {
		this.authService.logoutUser();
	}
}
