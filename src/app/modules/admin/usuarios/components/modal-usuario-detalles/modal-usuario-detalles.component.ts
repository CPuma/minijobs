import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { CalificacionesService } from 'src/app/core/services/calificaciones.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-modal-usuario-detalles',
	templateUrl: './modal-usuario-detalles.component.html',
	styleUrls: [ './modal-usuario-detalles.component.css' ]
})
export class ModalUsuarioDetallesComponent implements OnInit {
	@Input() usuario;
	titulo: String;
	calificacionesMutiJob = [];
	calificacionesSocioJob = [];
	promedioCalificacionMutiJob = 0;
	promedioCalificacionSocioJob = 0;

	constructor(
		public activeModal: NgbActiveModal,
		private calificacionesFireService: CalificacionesService,
		private router: Router
	) {}

	ngOnInit() {
		console.log(this.usuario);
		if (this.usuario && this.usuario.documentoNumero) {
			this.obtenerCalificacionesMultiJob(this.usuario.documentoNumero);
			this.obteneCalificacionesSocioJob(this.usuario.documentoNumero);
		} else {
			this.closeModal();
		}
	}

	obtenerCalificacionesMultiJob(idUsuario: string): void {
		this.calificacionesFireService.listarCalificacionesxMultiJob(idUsuario).then((calificaciones) => {
			console.log(calificaciones);
			if (calificaciones.length > 0) {
        let promedio = 0;
        calificaciones.map((calificacion) => (promedio += calificacion.calificacionMultiJob));

				this.promedioCalificacionMutiJob = promedio/calificaciones.length;
				this.calificacionesMutiJob = calificaciones;
				console.log('SOCIOJOBS', calificaciones);
				console.log('promedio SOCIOJOBS', this.promedioCalificacionMutiJob);
			}
		});
	}
	obteneCalificacionesSocioJob(idUsuario: string): void {
		this.calificacionesFireService.listarCalificacionesxSocioJob(idUsuario).then((calificaciones) => {
			console.log(calificaciones);
			if (calificaciones.length > 0) {
				let promedio = 0;
        calificaciones.map((calificacion) => (promedio += calificacion.calificacionSocioJob));
        
        
				this.promedioCalificacionSocioJob = promedio/calificaciones.length;
				console.log('SOCIOJOBS', calificaciones);
				console.log('promedio SOCIOJOBS', this.promedioCalificacionSocioJob);
				this.calificacionesSocioJob = calificaciones;
			}
		});
	}
	closeModal(): void {
		this.activeModal.close('Ok click');
	}
}
