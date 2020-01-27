import { Injectable } from '@angular/core';
import { CalificacionInterface } from '../models/calificacion';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
	providedIn: 'root'
})
export class CalificacionesService {
	private dbPath = 'Calificacion';

	constructor(private db: AngularFireDatabase) {}

	listarCalificacionesxTrabajo(idTrabajo: string): Promise<CalificacionInterface[] | any> {
		return new Promise((resolve, reject) => {
			try {
				let calificaciones = [];
				let calificacionesRef = this.db.database.ref(this.dbPath);
				calificacionesRef.orderByChild('idTrabajo').equalTo(idTrabajo).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let calificacion;
						calificacion = data.val();
						calificacion.id = data.key;
						calificaciones.push(calificacion);
					});
					resolve(calificaciones);
				});
			} catch (error) {
				console.error('SERVICE CALIFICACION:::');
				reject(error);
			}
		});
	}

	listarCalificacionesxMultiJob(idMultiJob: string): Promise<CalificacionInterface[] | any> {
		return new Promise((resolve, reject) => {
			try {
				let calificaciones = [];
				let promedio = 0;
				let calificacionesRef = this.db.database.ref(this.dbPath);
				calificacionesRef.orderByChild('idMultiJob').equalTo(idMultiJob).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let calificacion;
						calificacion = data.val();
						delete calificacion['calificacionSocioJob'];
						delete calificacion['idMultiJob'];
						promedio += calificacion['calificacionMultiJob'];
						calificaciones.push(calificacion);
					});
					promedio = promedio / calificaciones.length;
					calificaciones.push(promedio);
					resolve(calificaciones);
				});
			} catch (error) {
				console.error('SERVICE CALIFICACION:::');
				reject(error);
			}
		});
	}
	listarCalificacionesxSocioJob(idSocioJob: string): Promise<CalificacionInterface[] | any> {
		return new Promise((resolve, reject) => {
			try {
				let calificaciones = [];
				let promedio = 0;
				let calificacionesRef = this.db.database.ref(this.dbPath);
				calificacionesRef.orderByChild('idSocioJob').equalTo(idSocioJob).on('value', (snapshot) => {
					snapshot.forEach((data) => {
						let calificacion;
						calificacion = data.val();
						delete calificacion['calificacionMultiJob'];
						delete calificacion['idSocioJob'];
						promedio += calificacion['calificacionSocioJob'];
						calificaciones.push(calificacion);
					});
					promedio = promedio / calificaciones.length;
					calificaciones.push(promedio);
					resolve(calificaciones);
				});
			} catch (error) {
				console.error('SERVICE CALIFICACION:::');
				reject(error);
			}
		});
	}
}
