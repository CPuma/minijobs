export enum ESexo {
	Masculino = 'M',
	Femenino = 'F'
}
export enum EEstadoUsuario {
	Pendiente = 0,
	Activo = 1,
	Suspendido = 2
}
export enum EDocumentoTipo {
	Dni = 'DNI',
	passaporte = 'PASSPORTE',
	carnet_extranjeria = 'CARNET DE EXTRANJERIA'
}

export interface Usuario {
	key?: String;
	usuario: String;
	contrasenia: String;

	apellidoMaterno: String;
	apellidoPaterno: String;
	nombres: String;

	celular: String;
	codigo: String;
	direccion: String;
	estado: EEstadoUsuario; //  0 inactivo, 1 activo, 2 suspendido
	fechaNacimiento: Date;
	fechaCreacion: Date;
	genero: ESexo; // M masculino, F Femenino
	documentoTipo: EDocumentoTipo; // DNI ,PASSPORTE ,CARNET DE EXTRANJERIA
	documentoNumero: String;

	banco?: String;
	observacion?: String;
	numeroCuenta?: String;
}
