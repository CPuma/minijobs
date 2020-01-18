import { Component, Input, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { UsuarioInterface } from 'src/app/core/models/usuario';
import { UpperCaseCustomPipe } from 'src/app/shared/pipes/upper-case-custom.pipe';

@Component({
	selector: 'app-modal-crear',
	templateUrl: './modal-crear.component.html',
	styleUrls: [ './modal-crear.component.css' ]
})
export class ModalCrearComponent implements OnInit {
	@Input() usuario;
	titulo: String;
	isCreate: boolean;
	today = new Date().toLocaleDateString();

	usuarioFormGroup: FormGroup;

	constructor(
		public activeModal: NgbActiveModal,
		private usuarioFireService: UsuariosFirebaseService,
		private formBuilder: FormBuilder,
		private upperCasePipe: UpperCaseCustomPipe
	) {}

	ngOnInit(): void {
		this.intanciarUsuarioForm();
		// this.todayParse = this.datePipe.transform(this.today, 'dd-MM-yyyy');

		console.log('fecha', this.today);

		if (this.usuario) {
			this.editarUsuario(this.usuario);
			this.titulo = 'Editando Usuario!';
			this.isCreate = false;
		} else {
			this.titulo = 'Creando Usuario!';
			this.isCreate = true;
		}
	}

	intanciarUsuarioForm() {
		this.usuarioFormGroup = this.formBuilder.group({
			id: [ null, [] ],
			usuario: [ '', [ Validators.required ] ],
			// contrasenia: [ '', [ Validators.required ] ],
			apellidoPaterno: [ '', [ Validators.required ] ],
			apellidoMaterno: [ '', [ Validators.required ] ],
			nombres: [ '', [ Validators.required ] ],
			celular: [ '', [ Validators.required ] ],
			direccion: [ '', [ Validators.required ] ],
			estado: [ 'INACTIVO', [ Validators.required ] ],
			fechaNacimiento: [ this.today, [ Validators.required ] ],
			fechaCreacion: [ this.today, [ Validators.required ] ],
			genero: [ 'MASCULINO', [ Validators.required ] ],
			documentoTipo: [ 'DNI', [ Validators.required ] ],
			documentoNumero: [ '', [ Validators.required ] ],
			// banco: [ '', [] ],
			observacion: [ '', [] ]
			// numeroCuenta: [ '', [] ]
		});
	}

	editarUsuario(usuario) {
		console.log('Usuario para editar ', usuario);
		this.usuarioFormGroup.patchValue(usuario);
	}

	crearUsuario(usuario: UsuarioInterface): void {
		usuario = this.upperCasePipe.transform(usuario);
		this.usuarioFireService.crearUsuario(usuario);
		this.activeModal.close('Ok click');
	}

	actualizarUsuario(usuario: UsuarioInterface): void {
		console.log("Usuario antes de ",usuario);
		usuario = this.upperCasePipe.transform(usuario);
		console.log("Usuario Parseado",usuario);
		this.usuarioFireService.actualizarUsuario(usuario);
		this.activeModal.close('Ok click');
	}
}
