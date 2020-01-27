import { Injectable } from '@angular/core';
import { PostulacionInterface } from '../models/postulacion';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
	providedIn: 'root'
})
export class PostulacionesService {
	private dbPath = 'TrabajosPostulados';
	// postulacionesRef: AngularFireList<PostulacionInterface> = null;

	constructor(private db: AngularFireDatabase) {}

	listarPostulacionesxTrabajo(idTrabajo: string): Promise<PostulacionInterface[] | any> {
		return new Promise((resolve, reject) => {
			try {
				let postulaciones = [];
				let postulacionesRef = this.db.database.ref(this.dbPath);
				postulacionesRef.orderByChild('idTrabajo').equalTo(idTrabajo).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let postulacion;
						postulacion = data.val();
						postulacion.id = data.key;
						postulaciones.push(postulacion);
					});
					resolve(postulaciones);
				});
			} catch (error) {
				console.error('SERVICE POSTULACION:::');
				reject(error);
			}
		});
	}
	listarPostulacionesxMultiJob(idMultiJob: string): Promise<PostulacionInterface[] | any> {
		return new Promise((resolve, reject) => {
			try {
				let postulaciones = [];
				let postulacionesRef = this.db.database.ref(this.dbPath);
				postulacionesRef.orderByChild('idMultiJob').equalTo(idMultiJob).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let postulacion;
						postulacion = data.val();
						postulacion.id = data.key;
						postulaciones.push(postulacion);
					});
					resolve(postulaciones);
				});
			} catch (error) {
				console.error('SERVICE POSTULACION:::');
				reject(error);
			}
		});
	}

	estadoTrabajo(idTrabajosPostulados: string, estado: string): Promise<void> {
		let postulacionesRef = this.db.database.ref(this.dbPath + '/' + idTrabajosPostulados);
		return postulacionesRef.update({ estado });
	}
}
