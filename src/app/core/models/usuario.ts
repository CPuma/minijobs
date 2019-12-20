export enum ESexo {
	Masculino = 'M',
	Femenino = 'F'
}
// export enum EEstadoUsuario {
// 	Pendiente = 0,
// 	Activo = 1,
// 	Suspendido = 2
// }
export enum EDocumentoTipo {
	Dni = 'DNI',
	passaporte = 'PASSPORTE',
	carnet_extranjeria = 'CARNET DE EXTRANJERIA'
}
export interface Roles{
	admin?:boolean;
	afiliador?:boolean;
	socioJob?:boolean;
	usuario?:boolean;
}

export interface Usuario {
	key?: string;
	usuario?:string;
	contrasenia?: string;
	codigo?: string;

	apellidoMaterno: string;
	apellidoPaterno: string;
	nombres: string;

	celular: string;
	direccion: string;
	estado:string;
	// estado: EEstadoUsuario; //  0 inactivo, 1 activo, 2 suspendido
	fechaNacimiento: Date;
	fechaCreacion: Date;
	genero: ESexo; // M masculino, F Femenino
	documentoTipo: EDocumentoTipo; // DNI ,PASSPORTE ,CARNET DE EXTRANJERIA
	documentoNumero: string;

	banco?: string;
	observacion?: string;
	numeroCuenta?: string;

	roles:Roles
}
