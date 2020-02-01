import { Component, OnInit } from '@angular/core';
import { PostulacionInterface } from 'src/app/core/models/postulacion';
import { PostulacionesService } from 'src/app/core/services/postulaciones.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { positionElements } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { resolve } from 'url';
import { ModalCrearComponent } from '../../../usuarios/components/modal-crear/modal-crear.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalUsuarioDetallesComponent } from '../../../usuarios/components/modal-usuario-detalles/modal-usuario-detalles.component';
import { ModalDetallesPostulanteComponent } from '../modal-detalles-postulante/modal-detalles-postulante.component';

const MODALS = {
	detallesPostulante: ModalDetallesPostulanteComponent
};

@Component({
	selector: 'app-lista-postulantes',
	templateUrl: './lista-postulantes.component.html',
	styleUrls: [ './lista-postulantes.component.css' ]
})
export class ListaPostulantesComponent implements OnInit {
	closeResult: string;
	postulaciones: PostulacionInterface[] | any = [];
	idTrabajo: string;
	titulo: string;
	constructor(
		private modalService: NgbModal,
		private postulacionesService: PostulacionesService,
		private router: Router,
		private route: ActivatedRoute,
		private usuarioServerice: UsuariosFirebaseService
	) {}

	ngOnInit() {
		this.route.queryParams.subscribe((querys) => {
			this.titulo = querys['titulo'];
			console.log(this.titulo);
		});

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

	// buscarPostulante(idMultijob) {
	// 	this.postulacionesService
	// 		.listarPostulacionesxMultiJob(idMultijob)
	// 		.then((postulaciones) => (this.postulaciones = postulaciones))
	// 		.catch((error) => {
	// 			console.log(error);
	// 			return [];
	// 		});
	// }}

	open(nameModal: string, usuario?, estado?: string) {
		const modalRef = this.modalService.open(MODALS[nameModal]);
		modalRef.componentInstance.usuario = usuario;
	}
}
