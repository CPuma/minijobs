import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class AutenticationService {
	constructor(private afaService: AngularFireAuth) {}
	isAuth() {
		return this.afaService.authState.pipe(map((auth) => auth));
	}

  registerUser() {
  }
  
	loginEmailUser(email, password): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithEmailAndPassword(email, password);
	}
	loginFacebookUser(): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithPopup(new auth.FacebookAuthProvider());
	}
	loginGoogleUser(): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithPopup(new auth.GoogleAuthProvider());
	}
	logoutUser(): Promise<void> {
		return this.afaService.auth.signOut();
	}
}
