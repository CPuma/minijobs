import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { TrabajoInterface } from '../models/trabajo';

@Injectable({
	providedIn: 'root'
})
export class TrabajosFirebaseService {
	private dbPath = 'Trabajo';
	trabajosRef: AngularFireList<TrabajoInterface> = null;
	constructor(private db: AngularFireDatabase) {
		// this.instanciarUsuarioREF();
	}

	buscarTrabajoxSocioJob(idSocioJob: string): Promise<TrabajoInterface | any> {
		return new Promise((resolve, reject) => {
			try {
				let trabajos = [];
				let trabajosRef = this.db.database.ref(this.dbPath);
				trabajosRef.orderByChild('idSocioJob').equalTo(idSocioJob).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let tra;
						tra = data.val();
						tra.id = data.key;
						trabajos.push(tra);
					});
					resolve(trabajos);
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	listaTrabajos(orderby: string = 'fechaCreacionTrabajo'): AngularFireList<TrabajoInterface | any> {
		this.trabajosRef = this.db.list(this.dbPath, (ref) => ref.orderByChild(orderby));
		return this.trabajosRef;
	}
	estadoTrabajo(idTrabajo: string, estado: any): Promise<void> {
		return this.trabajosRef.update(idTrabajo, { estado });
	}

	buscarTrabajoxMultiob(idMultiJob: string): Promise<TrabajoInterface | any> {
		return new Promise((resolve, reject) => {
			try {
				let trabajos = [];
				let trabajosRef = this.db.database.ref(this.dbPath);
				trabajosRef.orderByChild('idMultiJob').equalTo(idMultiJob).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let tra;
						tra = data.val();
						tra.id = data.key;
						trabajos.push(tra);
					});
					resolve(trabajos);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}
