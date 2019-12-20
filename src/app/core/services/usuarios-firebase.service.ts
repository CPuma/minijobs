import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Usuario } from 'src/app/core/models/usuario';


@Injectable({
	providedIn: 'root'
})
export class UsuariosFirebaseService {
	private dbPath = '/Usuarios';
	public orderby = 'fechaCreacion';

	usuariosRef: AngularFireList<Usuario> = null;

	// constructor(private db: AngularFirestore) {}
	constructor(private db: AngularFireDatabase) {
		this.instanciarUsuarioREF();
	}
	instanciarUsuarioREF(dni?: string) {
		if (dni) {
			this.usuariosRef = this.db.list(this.dbPath, (ref) => ref.equalTo(dni));
		} else {
			this.usuariosRef = this.db.list(this.dbPath, (ref) => ref.orderByChild(this.orderby));
		}
	}

	buscarUsuario(dni: string): AngularFireList<Usuario | any> {
		this.instanciarUsuarioREF(dni);
		return this.usuariosRef;
	}

	listaUsuarios(orderby?: string): AngularFireList<Usuario | any> {
		this.orderby = orderby ? orderby : 'fechaCreacion';
		this.instanciarUsuarioREF();
		return this.usuariosRef;
	}

	crearUsuario(usuario: Usuario | any): void {
		this.usuariosRef.push(usuario);
	}

	actualizarUsuario(usuario: Usuario | any): Promise<void> {
		console.log(usuario);
		return this.usuariosRef.update(usuario.key, usuario);
	}

	estadoUsuario(key: string, estado: any): Promise<void> {
		return this.usuariosRef.update(key, { estado });
	}
}
