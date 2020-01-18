import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { UsuarioInterface } from 'src/app/core/models/usuario';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class UsuariosFirebaseService {
	private dbPath = 'Usuario';
	public orderby = 'fechaCreacion';

	usuariosRef: AngularFireList<UsuarioInterface> = null;

	// constructor(private db: AngularFirestore) {}
	constructor(private db: AngularFireDatabase, private authService: AuthenticationService) {
		this.instanciarUsuarioREF();
	}
	instanciarUsuarioREF(orderby: string = 'fechaCreacion', dni?: string) {
		// if (dni) {
		// 	this.usuariosRef = this.db.list(this.dbPath, (ref) => ref.orderByChild('dni').equalTo(dni));
		// } else {
		this.usuariosRef = this.db.list(this.dbPath, (ref) => ref.orderByChild(orderby));
		// }
	}

	buscarUsuario(dni: string): Promise<UsuarioInterface | any> {
		return new Promise((resolve, reject) => {
			try {
				let usuarios = [];
				let userRef = this.db.database.ref(this.dbPath);
				userRef.orderByChild('documentoNumero').equalTo(dni).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let usu;
						usu = data.val();
						usu.id = data.key;
						usuarios.push(usu);
					});
					resolve(usuarios);
				});
			} catch (error) {
				reject(error);
			}
		});

		// return this.usuariosRef;
	}

	listaUsuarios(orderby: string = 'fechaCreacion'): AngularFireList<UsuarioInterface | any> {
		this.instanciarUsuarioREF(orderby);
		return this.usuariosRef;
	}

	// INHABILITADO POR QUE SE DEBE USAR SDK ADMIN.. para crear sin iniciar sesion
	crearUsuario(usuario): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				this.usuariosRef.push(usuario).then((result) => console.log('CREAR USUARO. result del push', result));
				// this.authService.registerUser(usuario.email, usuario.contraseña).then((credential) => {});
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	actualizarUsuario(usuario: UsuarioInterface | any): Promise<void> {
		console.log(usuario);

		// return this.usuariosRef.update(usuario.id, usuario);
		const userRef: AngularFireObject<any> = this.db.object(`${this.dbPath}/${usuario.documentoNumero}`);
		return userRef.update(usuario);
	}

	estadoUsuario(documentoNumero: string, estado: any): Promise<void> {
		return this.usuariosRef.update(documentoNumero, { estado });
	}
}
