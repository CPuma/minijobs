import { Component, OnInit } from '@angular/core';
import { PostulacionInterface } from 'src/app/core/models/postulacion';
import { PostulacionesService } from 'src/app/core/services/postulaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { resolve } from 'url';

@Component({
	selector: 'app-lista-postulantes',
	templateUrl: './lista-postulantes.component.html',
	styleUrls: [ './lista-postulantes.component.css' ]
})
export class ListaPostulantesComponent implements OnInit {
	closeResult: string;
	postulaciones: PostulacionInterface[] | any = [];
	idTrabajo: string;
	constructor(
		private postulacionesService: PostulacionesService,
		private router: Router,
		private route: ActivatedRoute,
		private usuarioServerice: UsuariosFirebaseService
	) {}

	ngOnInit() {
		this.route.params.subscribe(
			(params) => {
				this.idTrabajo = params['idTrabajo'];
				console.log('PARAMSSS', params);
				console.log('idTrabajo', this.idTrabajo);
				if (this.idTrabajo) {
					this.listarPostulantes(this.idTrabajo.toString());
				} else {
					this.router.navigate([ 'admin/trabajos' ]);
				}
			},
			(error) => console.error(error)
		);
	}

	// listarPostulantes(idTrabajo: string): PostulacionInterface[] | any {
	// 	this.postulacionesService
	// 		.listarPostulacionesxTrabajo(idTrabajo)
	// 		.then((postulaciones) => {
	// 			console.log(this.postulaciones);
	// 			this.postulaciones = postulaciones;
	// 		})
	// 		.catch((error) => {
	// 			this.postulaciones = [];
	// 			console.error('LISTAR POSTULANTES', error);
	// 		});
	// }
	listarPostulantes(idTrabajo: string) {
		this.postulacionesService.listarPostulacionesxTrabajo(idTrabajo).then((postulaciones) => {
			postulaciones.forEach(async (postu) => {
				let usuarios = await this.usuarioServerice.buscarUsuario(postu['idMultiJob']);
				postu['multiJobs'] = usuarios[0];
			});
			console.log('POSTULACIONES', postulaciones);
			this.postulaciones = postulaciones;
		});
	}
	// listarPostulantes(idTrabajo: string): PostulacionInterface[] | any {
	// 	return this.postulacionesService
	// 		.listarPostulacionesxTrabajo(idTrabajo)
	// 		.pipe(
	// 			mergeMap((postulaciones) =>
	// 				postulaciones.map(async (postulante) => {
	// 					let post = await this.usuarioServerice
	// 						.buscarUsuario(postulante.idMultiJob)
	// 						.then((usuarios) => usuarios[0])
	// 						.catch((error) => []);
	// 					postulante.push(post);
	// 					return postulante;
	// 				})
	// 			)
	// 		)
	// 		.subscribe(
	// 			(postulaciones: Promise<any>) => {
	// 				console.log(postulaciones.toPromise());
	// 			},
	// 			(error) => {
	// 				this.postulaciones = [];
	// 				console.error('LISTAR POSTULANTES', error);
	// 			}
	// 		);
	// }

	// buscarPostulante(idMultijob) {
	// 	this.postulacionesService
	// 		.listarPostulacionesxMultiJob(idMultijob)
	// 		.then((postulaciones) => (this.postulaciones = postulaciones))
	// 		.catch((error) => {
	// 			console.log(error);
	// 			return [];
	// 		});
	// }
	open() {}
}
