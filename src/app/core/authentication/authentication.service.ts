import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

import { AngularFireDatabase, AngularFireObject, DatabaseSnapshot } from '@angular/fire/database';

import { UsuariosFirebaseService } from '../services/usuarios-firebase.service';
import { UsuarioInterface } from '../models/usuario';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private afaService: AngularFireAuth, private afdService: AngularFireDatabase) {}
	isAuth() {
		return this.afaService.authState.pipe(map((auth) => auth));
	}

	registerUser(email, password): Promise<auth.UserCredential> {
		return new Promise((resolve, reject) => {
			this.afaService.auth
				.createUserWithEmailAndPassword(email, password)
				.then((userCredentials) => {
					this.updateUserData(userCredentials.user);
					resolve(userCredentials);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}

	loginEmailUser(email, password): Promise<auth.UserCredential> {
		return new Promise((resolve, reject) => {
			this.afaService.auth
				.signInWithEmailAndPassword(email, password)
				.then((userCredentials) => {
					// this.updateUserData(userCredentials.user);
					resolve(userCredentials);
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	}
	loginFacebookUser(): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((userCredentials) => {
			this.updateUserData(userCredentials.user);
			return userCredentials;
		});
	}
	loginGoogleUser(): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
			this.updateUserData(userCredentials.user);
			return userCredentials;
		});
	}
	logoutUser(): Promise<void> {
		return this.afaService.auth.signOut();
	}
	async setUserData(id) {
		
		const userRef = this.afdService.object(`Usuarios/${id}`);
		return userRef.snapshotChanges().subscribe((userSnap) => {
			localStorage.setItem('userData', JSON.stringify(userSnap.payload.val()));
			console.log('SAVEEEEEE', userSnap.payload.val());
		});
	}
	getUserData() {
		localStorage.getItem('userData')
	}

	private updateUserData(user) {
		const userRef: AngularFireObject<any> = this.afdService.object(`Usuarios/${user.uid}`);
		userRef.snapshotChanges().subscribe(async (userSnap) => {
			console.log('key', userSnap.key);
			if (!userSnap.key) {
				const data: UsuarioInterface | any = {
					id: user.uid,
					email: user.email,
					isProfileComplete: false,
					roles: {
						usuario: true,
						admin: false
					}
				};

				return userRef.set(data);
			}
		});
	}
}
