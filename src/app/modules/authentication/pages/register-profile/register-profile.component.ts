import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioInterface } from 'src/app/core/models/usuario';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
	selector: 'app-register-profile',
	templateUrl: './register-profile.component.html',
	styleUrls: [ './register-profile.component.css' ]
})
export class RegisterProfileComponent implements OnInit {
	today = new Date().toLocaleDateString();
	usuarioFormGroup: FormGroup;
	constructor(
		private usuarioFireService: UsuariosFirebaseService,
		private formBuilder: FormBuilder,
		private authService: AuthenticationService
	) {}

	ngOnInit() {
		this.authService.isAuth().subscribe((user) => {
			console.log('AUTH', user);
		});
		this.intanciarUsuarioForm();
	}

	intanciarUsuarioForm() {
		this.usuarioFormGroup = this.formBuilder.group({
			id: [ null, [] ],
			email: [ '', [ Validators.required ] ],
			// contrasenia: [ '', [ Validators.required ] ],
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

	crearUsuario(usuario: UsuarioInterface) {
		this.usuarioFireService.crearUsuario(usuario);
	}

	actualizarUsuario(usuario: UsuarioInterface) {
		this.usuarioFireService.actualizarUsuario(usuario);
	}
}
