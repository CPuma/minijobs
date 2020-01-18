import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';

@Component({
	selector: 'app-modal-activar',
	templateUrl: './modal-activar.component.html',
	styleUrls: [ './modal-activar.component.css' ]
})
export class ModalActivarComponent implements OnInit {
	@Input() usuario;
	@Input() estado: string;
	isActivation: boolean = false;

	constructor(public activeModal: NgbActiveModal, private usuarioFireService: UsuariosFirebaseService) {}

	ngOnInit() {
		if (this.estado.toUpperCase() == 'ACTIVO') {
			this.isActivation = true;
		}
		console.log('Usuario', this.usuario);
	}
	cambiarEstado() {
		this.usuarioFireService.estadoUsuario(this.usuario.documentoNumero, this.estado.toUpperCase());
		this.activeModal.close('Ok click');
	}
	cancelar() {
		this.activeModal.close('cancel click');
	}
}
