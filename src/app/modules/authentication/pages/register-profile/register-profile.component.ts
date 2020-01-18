import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuarioInterface } from 'src/app/core/models/usuario';
import { UsuariosFirebaseService } from 'src/app/core/services/usuarios-firebase.service';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-register-profile',
	templateUrl: './register-profile.component.html',
	styleUrls: [ './register-profile.component.css' ]
})
export class RegisterProfileComponent implements OnInit {
	today = new Date().toLocaleDateString();
	usuarioFormGroup: FormGroup;
	isCreate = false;

	usuario: UsuarioInterface | any = this.route.queryParams.subscribe.toString();
	user: { uid?; email?; roles? } = {};
	constructor(
		private usuarioFireService: UsuariosFirebaseService,
		private formBuilder: FormBuilder,
		private authService: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		// this.usuario= this.route.snapshot.paramMap.get('usuario');
		this.usuario = this.authService.getUserData();
		console.log('UUUSUU, ', this.usuario);

		this.authService.isAuth().subscribe((user) => {
			this.user = {
				uid: user.uid,
				email: user.email
			};
			this.intanciarUsuarioForm();
			if (this.usuario) {
				this.isCreate = false;
				console.log('Actualizar USERRRddd', this.user);
				this.intanciarUsuarioForm(this.usuario);
			} else {
				this.isCreate = true;
				console.log('Crear USERRRddd', this.user);
				this.intanciarUsuarioForm();
			}
		});
	}

	intanciarUsuarioForm(usuario?) {
		if (usuario) {
			this.usuarioFormGroup = this.formBuilder.group({
				id: [ this.user.uid, [] ],
				usuario: [ this.user.email, [] ],
				apellidoPaterno: [ usuario.apellidoPaterno || '', [ Validators.required ] ],
				apellidoMaterno: [ usuario.apellidoMaterno, [ Validators.required ] ],
				nombres: [ usuario.nombres, [ Validators.required ] ],
				celular: [ usuario.celular, [ Validators.required ] ],
				direccion: [ usuario.direccion, [ Validators.required ] ],
				estado: [ 'INACTIVO', [ Validators.required ] ],
				fechaNacimiento: [ this.today, [ Validators.required ] ],
				fechaCreacion: [ this.today, [ Validators.required ] ],
				genero: [ 'MASCULINO', [ Validators.required ] ],
				documentoTipo: [ 'DNI', [ Validators.required ] ],
				documentoNumero: [ usuario.documentoNumero, [ Validators.required ] ]
			});
		} else {
			this.usuarioFormGroup = this.formBuilder.group({
				id: [ null, [] ],
				usuario: [ '', [] ],
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
				documentoNumero: [ '', [ Validators.required ] ]
			});
		}
	}

	crearUsuario(usuario: UsuarioInterface) {
		console.log(this.user);
		Object.keys(usuario).forEach((k) => {
			if (typeof usuario[k] == 'string') {
				console.log('string', usuario[k]);
				usuario[k] = usuario[k].toUpperCase();
			}
		});

		// this.user.email;
		usuario.usuario = this.user.email.toUpperCase();
		usuario.id = this.user.uid;
		usuario.roles = {
			usuario: true,
			admin: false
		};

		this.authService
			.setUsuarioProfile(usuario)
			.then((result) => {
				console.log('CREANDO USUARIO', result);
				this.router.navigate([ 'admin' ]);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	actualizarUsuario(usuario: UsuarioInterface) {
		Object.keys(usuario).forEach((k) => {
			if (typeof usuario[k] == 'string') {
				console.log('string', usuario[k]);
				usuario[k] = usuario[k].toUpperCase();
			}
		});
		// usuario.usuario = this.user.email;
		console.log(this.user);
		usuario.id = this.user.uid;

		if (!usuario.roles) {
			console.log('no se encontro roles');
			usuario.roles = {
				usuario: true,
				admin: false
			};
		}

		console.log('con roles', usuario);
		return this.authService
			.setUsuarioProfile(usuario)
			.then((result) => {
				console.log('resul', result);
				this.router.navigate([ 'admin' ]);
			})
			.catch((error) => console.error(error));
	}

	validaciones() {
		console.log(this.usuarioFormGroup.value);
		console.log(this.usuarioFormGroup.invalid);
	}
}
