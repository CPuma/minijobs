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
	@Input() estado:string;

	constructor(public activeModal: NgbActiveModal, private usuarioFireService: UsuariosFirebaseService) {}

	ngOnInit() {
		console.log('Usuario', this.usuario);
	}
	cambiarEstado() {
		this.usuarioFireService.estadoUsuario(this.usuario.key, this.estado);
		this.activeModal.close('Ok click');
	}
}
