import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	formLogin: FormGroup;

	constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {}

	ngOnInit() {
		this.formLogin = this.formBuilder.group({
			email: [ '', [ Validators.required, Validators.email ] ],
			password: [ '', [ Validators.required, Validators.minLength(6) ] ]
		});
	}

	async login(): Promise<void> {
		let { email, password } = this.formLogin.value;
		let userCredential = await this.authService.loginEmailUser(email, password);
		return this.confirmUsuarioProfile(userCredential);
	}

	async loginWithGoogle(): Promise<void> {
		try {
			let userCredential = await this.authService.loginGoogleUser();
			return this.confirmUsuarioProfile(userCredential);
		} catch (error) {
			console.error(error);
		}
	}

	async loginWithFacebook(): Promise<void> {
		try {
			let userCredential = await this.authService.loginFacebookUser();
			return this.confirmUsuarioProfile(userCredential);
		} catch (error) {
			console.error(error);
		}
	}

	async confirmUsuarioProfile(userCredential): Promise<void> {
		try {
			let profile = await this.authService.getUsuarioProfile(userCredential.user.email); // email como usuario
			console.log('PROOOOFFFFILE', profile);
			if (!!profile && profile.isComplete) {
				console.log('COmPLETO');
				this.authService.setUserData(profile.usuario);
				this.router.navigateByUrl('/admin');
			} else {
				console.log('InCOmPLETO');
				this.authService.setUserData(profile.usuario);
				console.log('login usuario,', profile.usuario);
				this.router.navigate([ '/auth/register-profile' ]);
			}
		} catch (error) {}
	}
}
