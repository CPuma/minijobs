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

	login() {
		let { email, password } = this.formLogin.value;
		this.authService
			.loginEmailUser(email, password)
			.then((userCredential) => {
				this.router.navigateByUrl('/admin');
				console.log;
			})
			.catch((error) => console.error(error));
		}
		loginWithGoogle() {
			this.authService
			.loginGoogleUser()
			.then((userCredential) => {
				// this.router.navigateByUrl('/auth/register-profile');
				console.log('GOOGLE Credential ::: ', userCredential);
				this.authService.setUserData(userCredential.user.uid);
				this.router.navigateByUrl('/admin');
			})
			.catch((error) => console.error(error));
		}
		
		loginWithFacebook() {
			this.authService
			.loginFacebookUser()
			.then((userCredential) => {
				this.router.navigateByUrl('/admin');
				console.log('GOOGLE Credential ::: ', userCredential);
			})
			.catch((error) => console.error(error));
	}
}
