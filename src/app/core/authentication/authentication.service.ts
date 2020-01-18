import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';

import { AngularFireDatabase, AngularFireObject, DatabaseSnapshot, SnapshotAction } from '@angular/fire/database';

import { UsuariosFirebaseService } from '../services/usuarios-firebase.service';
import { UsuarioInterface } from '../models/usuario';
import { resolve } from 'url';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	pathUsuario = 'Usuario'
	constructor(private afaService: AngularFireAuth, private afdService: AngularFireDatabase) {}
	isAuth() {
		return this.afaService.authState.pipe(map((auth) => auth));
	}

	registerUser(email, password): Promise<auth.UserCredential> {
		return new Promise((resolve, reject) => {
			this.afaService.auth
				.createUserWithEmailAndPassword(email, password)
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

	loginEmailUser(email, password): Promise<auth.UserCredential | boolean> {
		return new Promise((resolve, reject) => {
			this.afaService.auth
				.signInWithEmailAndPassword(email, password)
				.then((userCredentials) => {
					// this.updateUserData(userCredentials.user);
					resolve(userCredentials);
				})
				.catch(async (error) => {
					try {
						if (error.code == 'auth/user-not-found') {
							let usuario = await this.iniciarSession(email, password);
							if (!usuario) throw 'Usuario o contraseña Incorrecto';
							this.registerUser(usuario.usuario, usuario.contrasenia)
								.then((userCredentials) => resolve(userCredentials))
								.catch((error) => reject(error));
						} else {
							throw error;
						}
					} catch (error) {
						console.log('error login firebase \n', error);
						reject(error);
					}
				});
		});
	}

	loginFacebookUser(): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((userCredentials) => {
			// this.updateUserData(userCredentials.user);
			return userCredentials;
		});
	}
	loginGoogleUser(): Promise<auth.UserCredential> {
		return this.afaService.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((userCredentials) => {
			// this.updateUserData(userCredentials.user);
			return userCredentials;
		});
	}
	logoutUser(): Promise<void> {
		return this.afaService.auth.signOut();
	}

	setUserData(usuario: UsuarioInterface | any) {
		localStorage.setItem('userData', JSON.stringify(usuario));
	}
	getUserData() {
		return JSON.parse(localStorage.getItem('userData'));
	}
	// =============

	getUsuarioProfile(usuario: string): Promise<UsuarioInterface | any> {
		usuario = usuario.toUpperCase();
		console.log(usuario);
		let userRef = this.afdService.database.ref(this.pathUsuario);
		return new Promise((resolve, reject) => {
			userRef.orderByChild('usuario').equalTo(usuario).on('value', function(snapshot) {
				try {
					if (snapshot.numChildren() === 0) {
						resolve({ isComplete: false, usuario: null });
						// throw 'Sin Profile, Profiles';
					} else if (snapshot.numChildren() === 1) {
						let usuario;
						snapshot.forEach((data) => {
							usuario = data.val();
							usuario.id = data.key;
						});
						console.log('Extrayendo Profile', usuario);
						if (usuario.id && usuario.roles && usuario.documentoNumero) {
							console.log('usuario Completo');
							resolve({ isComplete: true, usuario });
						} else {
							console.log('Usuario existe, pero sin  roles');
							resolve({ isComplete: false, usuario });
						}
					} else {
						throw 'Error , comuniquese con  el soporte tecnido, hay usuarios duplicados';
					}
				} catch (error) {
					console.error('error service ,  al iniciar session,\n', error);
					reject(null);
				}
			});
		});
	}
	setUsuarioProfile(usuario: UsuarioInterface): Promise<any> {
		return new Promise(async (resolve, reject) => {
			let userRef = this.afdService.database.ref(this.pathUsuario);

			console.log(usuario.documentoNumero);
			console.log(usuario.usuario);
			userRef.orderByChild('documentoNumero').equalTo(usuario.documentoNumero).on('value', (userSnapshot) => {
				console.log('snapshot', userSnapshot.numChildren());

				try {
					if (userSnapshot.numChildren() === 0) {
						console.log('CREAANNNNDOOOO');
						var usuarioRef = this.afdService.database.ref(this.pathUsuario+'/' + usuario.documentoNumero);
						usuarioRef.set(usuario).then((result) => resolve(result)).catch((error) => reject(error));

						// throw 'Sin Profile, Profiles';
					} else if (userSnapshot.numChildren() === 1) {
						let usuarioSnap;
						userSnapshot.forEach((data) => {
							usuarioSnap = data.val();
							// usuarioSnap.id = data.key;
						});
						console.log('Extrayendo Profile', usuarioSnap);
						if (!usuarioSnap.usuario || !usuario.usuario) throw 'No hay usuario registrado';
						if (usuarioSnap.usuario.toUpperCase() === usuario.usuario.toUpperCase()) {
							console.log('usuario Completo');
							var usuarioRef = this.afdService.database.ref(this.pathUsuario+'/' + usuario.documentoNumero);
							return usuarioRef
								.update(usuario)
								.then((result) => resolve(result))
								.catch((error) => reject(error));
						} else {
							throw 'id Usuario duplicado o no coincide';
						}
					} else {
						throw 'Error , comuniquese con  el soporte tecnido, hay usuarios duplicados';
					}
				} catch (error) {
					console.error('error service ,  al iniciar session,\n', error);
					return new Promise((resolve, reject) => {
						reject(error);
					});
				}
			});
		});

		// const userRef: AngularFireObject<any> = this.afdService.object(`Usuario/${usuario.documentoNumero}`);

		// const userSnap: any = userRef.snapshotChanges().toPromise();
		// console.log('SNAP', userSnap);
		// console.log('key', userSnap.key);
		// if (!!userSnap.key) {
		// 	const data: UsuarioInterface | any = {
		// 		id: usuario.uid,
		// 		email: usuario.email,
		// 		roles: {
		// 			usuario: true,
		// 			admin: false
		// 		}
		// 	};

		// 	return userRef.update(data);
		// } else {
		// 	return userRef.set(usuario);
		// }

		// const userRef = this.afdService.database.ref(`Usuario/${usuario.documentoNumero}`);

		// const newUsuario = userRef.push(usuario.documentoNumero);
		// return newUsuario.set(usuario);
	}

	private iniciarSession(email, password): Promise<UsuarioInterface> {


		return new Promise((resolve, reject) => {
			let userRef = this.afdService.database.ref(this.pathUsuario);
			userRef.orderByChild('usuario').equalTo(email).on('value', (snapshot) => {
				try {
					if (snapshot.numChildren() === 0) {
						console.log('Usuario Incorrecto');
						resolve(null);
					} else if (snapshot.numChildren() === 1) {
						let usuario;
						snapshot.forEach((data) => {
							usuario = data.val();
							usuario.id = data.key;
						});
						if (usuario.contrasenia === password) {
							console.log('usuario Loggeado');
							resolve(usuario);
						} else {
							console.log('contraseña incorrecta');
							resolve(null);
						}
					} else {
						console.log('Error , comuniquese con  el soporte tecnido, hay usuarios duplicados');
						resolve(null);
					}
				} catch (error) {
					console.error('error service ,  al iniciar session,\n', error);
					reject(null);
				}
			});
		});
	}
}
