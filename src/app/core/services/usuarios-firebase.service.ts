import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { UsuarioInterface } from 'src/app/core/models/usuario';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
	providedIn: 'root'
})
export class UsuariosFirebaseService {
	private dbPath = '/Usuarios';
	public orderby = 'fechaCreacion';

	usuariosRef: AngularFireList<UsuarioInterface> = null;

	// constructor(private db: AngularFirestore) {}
	constructor(private db: AngularFireDatabase, private authService: AuthenticationService) {
		this.instanciarUsuarioREF();
	}
	instanciarUsuarioREF(dni?: string) {
		if (dni) {
			this.usuariosRef = this.db.list(this.dbPath, (ref) => ref.equalTo(dni));
		} else {
			this.usuariosRef = this.db.list(this.dbPath, (ref) => ref.orderByChild(this.orderby));
		}
	}

	buscarUsuario(dni: string): AngularFireList<UsuarioInterface | any> {
		this.instanciarUsuarioREF(dni);
		return this.usuariosRef;
	}

	listaUsuarios(orderby?: string): AngularFireList<UsuarioInterface | any> {
		this.orderby = orderby ? orderby : 'fechaCreacion';
		this.instanciarUsuarioREF();
		return this.usuariosRef;
	}


	// INHABILITADO POR QUE SE DEBE USAR SDK ADMIN.. para crear sin iniciar sesion
	crearUsuario(usuario): void {
		this.usuariosRef.push(usuario);
		// this.authService.registerUser(usuario.email, usuario.contraseña).then((credential) => {});
	}

	actualizarUsuario(usuario: UsuarioInterface | any): Promise<void> {
		console.log(usuario);

		// return this.usuariosRef.update(usuario.id, usuario);
		const userRef: AngularFireObject<any> = this.db.object(`Usuarios/${usuario.id}`);
		return userRef.update(usuario);
	}

	estadoUsuario(id: string, estado: any): Promise<void> {
		return this.usuariosRef.update(id, { estado });
	}
}
