import { Component, OnInit, Input } from '@angular/core';
import { CalificacionesService } from 'src/app/core/services/calificaciones.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-modal-detalles-postulante',
	templateUrl: './modal-detalles-postulante.component.html',
	styleUrls: [ './modal-detalles-postulante.component.css' ]
})
export class ModalDetallesPostulanteComponent implements OnInit {
	@Input() usuario;
	titulo: String;
	calificacionesMutiJob = [];
	promedioCalificacionMutiJob = 0;

	constructor(public activeModal: NgbActiveModal, private calificacionesFireService: CalificacionesService) {}

	ngOnInit() {
		if (this.usuario && this.usuario.documentoNumero) {
			this.titulo = this.usuario.apellidoPaterno + ' ' + this.usuario.nombres;
			console.log('USUARIO', this.usuario);
			this.obtenerCalificacionesMultiJob(this.usuario.documentoNumero);
		} else {
			this.closeModal();
		}
	}

	closeModal(): void {
		this.activeModal.close('Ok click');
	}

	obtenerCalificacionesMultiJob(idUsuario: string): void {
		this.calificacionesFireService.listarCalificacionesxMultiJob(idUsuario).then((calificaciones) => {
			console.log(calificaciones);
			if (calificaciones.length > 0) {
				let promedio = 0;
				calificaciones.map((calificacion) => {
					if (calificacion.calificacionMultiJob || calificacion.calificacionMultiJob > 0) {
						promedio += calificacion.calificacionMultiJob;
						this.calificacionesMutiJob.push(calificacion);
					}
				});

				this.promedioCalificacionMutiJob = promedio / this.calificacionesMutiJob.length;
			}
		});
	}
}
