import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearComponent } from '../../components/modal-crear/modal-crear.component';
import { ModalActivarComponent } from '../../components/modal-activar/modal-activar.component';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { UsuarioInterface } from 'src/app/core/models/usuario';

import { map, filter } from 'rxjs/operators';
import { ModalUsuarioDetallesComponent } from '../../components/modal-usuario-detalles/modal-usuario-detalles.component';

const MODALS = {
	formUsuario: ModalCrearComponent,
	cambiarEstado: ModalActivarComponent,
	usuariosDetalles: ModalUsuarioDetallesComponent
};

@Component({
	selector: 'app-lista-usuarios',

	templateUrl: './lista-usuarios.component.html',
	styleUrls: [ './lista-usuarios.component.css' ]
})
export class ListaUsuariosComponent implements OnInit {
	closeResult: string;
	usuarios: UsuarioInterface[] | any;

	constructor(private modalService: NgbModal, private usuarioFireService: UsuariosFirebaseService) {}

	ngOnInit() {
		this.listartUsuarios();
	}

	listartUsuarios(orderby?: string) {
		this.usuarioFireService
			.listaUsuarios(orderby)
			.snapshotChanges()
			.pipe(map((changes) => changes.map((c) => c.payload.val())))
			.subscribe((usuarios) => {
				this.usuarios = usuarios;
				console.log(this.usuarios);
			});
	}
	buscarUsuario(documentoNumero) {
		if (documentoNumero) {
			this.usuarioFireService
				.buscarUsuario(documentoNumero)
				.then((usuario) => (this.usuarios = usuario))
				.catch((error) => {
					console.log(error);
					return [];
				});
		} else {
			this.listartUsuarios();
		}
	}

	open(nameModal: string, usuario?, estado?: string) {
		const modalRef = this.modalService.open(MODALS[nameModal]);
		modalRef.componentInstance.usuario = usuario;
		if (nameModal == 'cambiarEstado') {
			modalRef.componentInstance.estado = estado;
		}
	}
}
