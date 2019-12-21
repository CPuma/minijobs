import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearComponent } from '../../components/modal-crear/modal-crear.component';
import { ModalActivarComponent } from '../../components/modal-activar/modal-activar.component';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { UsuarioInterface } from 'src/app/core/models/usuario';

import { map, filter } from 'rxjs/operators';

const MODALS = {
	formUsuario: ModalCrearComponent,
	cambiarEstado: ModalActivarComponent
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
			.pipe(map((changes) => changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))))
			.subscribe((usuarios) => {
				console.log(usuarios);
				this.usuarios = usuarios;
			});
	}
	buscarUsuario(dni) {
		this.usuarioFireService
			.listaUsuarios()
			.snapshotChanges()
			.pipe(
				map((changes) => changes.map((c) => ({ id: c.payload.key, ...c.payload.val() })))
			)
			.subscribe((usuarios) => {
				console.log(usuarios);
				this.usuarios = usuarios;
			});
	}

	open(nameModal: string, usuario?, estado?: string) {
		const modalRef = this.modalService.open(MODALS[nameModal]);
		modalRef.componentInstance.usuario = usuario;
		if (nameModal == 'cambiarEstado') {
			modalRef.componentInstance.estado = estado;
		}
	}
}
