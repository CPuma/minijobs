import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-modal-crear',
	templateUrl: './modal-crear.component.html',
	styleUrls: [ './modal-crear.component.css' ]
})
export class ModalCrearComponent implements OnInit {
	@Input() usuario;
	titulo: String;

	today = new Date().toLocaleDateString();
	// todayParse: string;

	usuarioFormGroup: FormGroup;

	constructor(
		public activeModal: NgbActiveModal,
		private usuarioFireService: UsuariosFirebaseService,
		private formBuilder: FormBuilder,
		private datePipe: DatePipe
	) {}

	ngOnInit(): void {
		this.intanciarUsuarioForm();
		// this.todayParse = this.datePipe.transform(this.today, 'dd-MM-yyyy');

		console.log('fecha', this.today);

		if (this.usuario) {
			this.editarUsuario(this.usuario);
			this.titulo = 'Editando Usuario!';
		} else {
			this.titulo = 'Creando Usuario!';
		}
	}

	intanciarUsuarioForm() {
		this.usuarioFormGroup = this.formBuilder.group({
			key: [ null, [] ],
			usuario: [ '', [ Validators.required ] ],
			contrasenia: [ '', [ Validators.required ] ],
			apellidoPaterno: [ '', [ Validators.required ] ],
			apellidoMaterno: [ '', [ Validators.required ] ],
			nombres: [ '', [ Validators.required ] ],
			celular: [ '', [ Validators.required ] ],
			codigo: [ '', [] ],
			direccion: [ '', [ Validators.required ] ],
			estado: [ 'INACTIVO', [ Validators.required ] ],
			fechaNacimiento: [ this.today, [ Validators.required ] ],
			fechaCreacion: [ this.today, [ Validators.required ] ],
			genero: [ 'MASCULINO', [ Validators.required ] ],
			documentoTipo: [ 'DNI', [ Validators.required ] ],
			documentoNumero: [ '', [ Validators.required ] ],
			banco: [ '', [] ],
			observacion: [ '', [] ],
			numeroCuenta: [ '', [] ]
		});
	}

	editarUsuario(usuario) {
		this.usuarioFormGroup.patchValue(usuario);
	}

	crearUsuario(usuario: Usuario) {
		this.usuarioFireService.crearUsuario(usuario);
		this.activeModal.close('Ok click');
	}

	actualizarUsuario(usuario: Usuario) {
		this.usuarioFireService.actualizarUsuario(usuario);
		this.activeModal.close('Ok click');
	}
}
